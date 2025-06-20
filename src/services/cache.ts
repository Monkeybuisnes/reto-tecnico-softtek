// src/services/cache.ts
import { createClient } from 'redis';

// Definimos el tipo de cliente de manera más simple
type RedisClient = ReturnType<typeof createClient>;

let redisClient: RedisClient | null = null;

/**
 * Obtiene una instancia del cliente Redis, creándola si no existe
 * Esta función implementa el patrón Singleton para el cliente Redis
 */
const getRedisClient = (): RedisClient => {
  if (!redisClient) {
    // Crear el cliente con configuración básica
    redisClient = createClient({ 
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      // Configuración de reconexión automática
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000)
      }
    });
    
    // Configurar manejadores de eventos para monitoreo
    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis connected successfully');
    });

    redisClient.on('reconnecting', () => {
      console.log('Redis reconnecting...');
    });

    redisClient.on('ready', () => {
      console.log('Redis client ready');
    });
  }
  return redisClient;
};

/**
 * Establece la conexión con Redis si no está ya conectado
 * Esta función es segura para llamar múltiples veces
 */
export const connectRedis = async (): Promise<void> => {
  const client = getRedisClient();
  
  // Solo conectar si el cliente no está ya conectado
  if (!client.isOpen) {
    try {
      await client.connect();
      console.log('Redis connection established');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      throw error;
    }
  }
};

/**
 * Obtiene datos del cache de Redis
 * @param key - La clave para buscar en el cache
 * @returns Los datos parseados o null si no existen o hay error
 */
export const getCachedData = async (key: string): Promise<any> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
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
    // En caso de error, devolvemos null para que la aplicación continúe
    return null;
  }
};

/**
 * Almacena datos en el cache de Redis con TTL
 * @param key - La clave para almacenar
 * @param value - El valor a almacenar (será convertido a JSON)
 * @param ttl - Tiempo de vida en segundos (por defecto 30 minutos)
 */
export const cacheData = async (key: string, value: any, ttl: number = 1800): Promise<void> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    
    // Convertir el valor a JSON y almacenarlo con TTL
    await client.setEx(key, ttl, JSON.stringify(value));
    console.log(`Data cached successfully with key: ${key}, TTL: ${ttl}s`);
  } catch (error) {
    console.error('Cache write error:', error);
    // No lanzamos el error para que la aplicación continúe funcionando
    // incluso si el cache falla
  }
};

/**
 * Cierra la conexión con Redis de manera limpia
 * Útil para pruebas y cierre de la aplicación
 */
export const disconnectRedis = async (): Promise<void> => {
  if (redisClient && redisClient.isOpen) {
    try {
      await redisClient.disconnect();
      console.log('Redis connection closed');
      redisClient = null;
    } catch (error) {
      console.error('Error disconnecting from Redis:', error);
    }
  }
};

/**
 * Verifica si Redis está conectado y funcionando
 * @returns true si Redis está disponible, false en caso contrario
 */
export const isRedisConnected = async (): Promise<boolean> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    console.error('Redis health check failed:', error);
    return false;
  }
};