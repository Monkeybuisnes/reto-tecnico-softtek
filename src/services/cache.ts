import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient>;

const getRedisClient = () => {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis Client Error', err));
  }
  return redisClient;
};

export const connectRedis = async () => {
  const client = getRedisClient();
  if (!client.isOpen) await client.connect();
};

export const getCachedData = async (key: string): Promise<any> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};

export const cacheData = async (key: string, value: any, ttl: number = 1800): Promise<void> => {
  try {
    await connectRedis();
    const client = getRedisClient();
    await client.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Cache write error:', error);
  }
};