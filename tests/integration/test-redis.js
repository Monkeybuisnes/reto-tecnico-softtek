// test-redis.js
const { connectRedis, cacheData, getCachedData, disconnectRedis } = require('./dist/src/services/cache');

async function testRedis() {
  try {
    console.log('Testing Redis connection...');
    
    // Probar almacenamiento
    await cacheData('test-key', { message: 'Hello Redis!' }, 60);
    
    // Probar lectura
    const data = await getCachedData('test-key');
    console.log('Retrieved data:', data);
    
    // Limpiar
    await disconnectRedis();
    console.log('Redis test completed successfully!');
  } catch (error) {
    console.error('Redis test failed:', error);
  }
}

testRedis();