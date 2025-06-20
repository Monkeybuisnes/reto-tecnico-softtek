import { createClient, RedisClientType } from 'redis';

// Cliente Redis global
let redisClient: RedisClientType | null = null;

/**
 * Configuración del cliente Redis
 * Maneja la conexión y reconexión automática
 */
const createRedisClient = (): RedisClientType => {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    // Configuración de retry automático
    socket: {
      reconnectStrategy: (retries) => {
        console.log(`Redis reconnect attempt ${retries}`);
        // Retry cada 2 segundos, máximo 10 intentos
        if (retries > 10) {
          return new Error('Redis max retries exceeded');
        }
        return 2000;
      }
    }
  });

  // Event listeners para debugging y monitoring
  client.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

  client.on('connect', () => {
    console.log('Redis client connected successfully');
  });

  client.on('ready', () => {
    console.log('Redis client ready to accept commands');
  });

  client.on('end', () => {
    console.log('Redis client connection ended');
  });

  return client;
};

/**
 * Obtiene o crea el cliente Redis
 * Implementa patrón singleton para reutilizar la conexión
 */
const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    redisClient = createRedisClient();
  }
  return redisClient;
};

/**
 * Conecta al servidor Redis si no está conectado
 * Maneja errores de conexión gracefully
 */
export const connectRedis = async (): Promise<void> => {
  try {
    const client = getRedisClient();
    
    // Solo conectamos si no está ya conectado
    if (!client.isOpen) {
      await client.connect();
      console.log('Redis connection established');
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    // En caso de error, continuamos sin cache
    // Esto permite que la aplicación funcione sin Redis
  }
};

/**
 * Obtiene datos del cache
 * @param key - Clave del cache
 * @returns Datos parseados o null si no existen o hay error
 */
export const getCachedData = async (key: string): Promise<any> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    // Verificamos que el cliente esté conectado
    if (!client.isOpen) {
      console.log('Redis client not connected, skipping cache read');
      return null;
    }

    const data = await client.get(key);
    
    if (data) {
      console.log(`Cache hit for key: ${key}`);
      return JSON.parse(data);
    } else {
      console.log(`Cache miss for key: ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Cache read error:', error);
    // Retornamos null en caso de error para que la aplicación continúe
    return null;
  }
};

/**
 * Almacena datos en el cache
 * @param key - Clave del cache
 * @param value - Valor a almacenar (será serializado a JSON)
 * @param ttl - Tiempo de vida en segundos (default: 1800 = 30 minutos)
 */
export const cacheData = async (key: string, value: any, ttl: number = 1800): Promise<void> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    // Verificamos que el cliente esté conectado
    if (!client.isOpen) {
      console.log('Redis client not connected, skipping cache write');
      return;
    }

    // Serializamos el valor a JSON
    const serializedValue = JSON.stringify(value);
    
    // Almacenamos con TTL
    await client.setEx(key, ttl, serializedValue);
    
    console.log(`Data cached successfully with key: ${key}, TTL: ${ttl}s`);
  } catch (error) {
    console.error('Cache write error:', error);
    // No lanzamos error para que la aplicación continúe funcionando
  }
};

/**
 * Elimina una clave del cache
 * @param key - Clave a eliminar
 */
export const deleteCachedData = async (key: string): Promise<void> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    if (!client.isOpen) {
      console.log('Redis client not connected, skipping cache delete');
      return;
    }

    await client.del(key);
    console.log(`Cache key deleted: ${key}`);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
};

/**
 * Verifica si una clave existe en el cache
 * @param key - Clave a verificar
 * @returns true si existe, false si no existe o hay error
 */
export const existsInCache = async (key: string): Promise<boolean> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    if (!client.isOpen) {
      return false;
    }

    const exists = await client.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('Cache exists check error:', error);
    return false;
  }
};

/**
 * Obtiene el TTL restante de una clave
 * @param key - Clave a verificar
 * @returns TTL en segundos, -1 si no tiene TTL, -2 si no existe
 */
export const getCacheTTL = async (key: string): Promise<number> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    if (!client.isOpen) {
      return -2;
    }

    return await client.ttl(key);
  } catch (error) {
    console.error('Cache TTL check error:', error);
    return -2;
  }
};

/**
 * Desconecta el cliente Redis
 * Útil para cleanup en tests o shutdown de la aplicación
 */
export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient && redisClient.isOpen) {
      await redisClient.disconnect();
      console.log('Redis client disconnected');
    }
  } catch (error) {
    console.error('Error disconnecting Redis:', error);
  } finally {
    redisClient = null;
  }
};

/**
 * Función para limpiar todo el cache (útil para testing)
 */
export const flushCache = async (): Promise<void> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    if (!client.isOpen) {
      console.log('Redis client not connected, skipping cache flush');
      return;
    }

    await client.flushDb();
    console.log('Cache flushed successfully');
  } catch (error) {
    console.error('Cache flush error:', error);
  }
};