module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/tests/'
  ],
  setupFiles: ['dotenv/config']
};