const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './src',
});

/**
 * @type {import('@jest/types').Config.InitialOptions}
 **/
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
  // module alias
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '@/(.*)': '<rootDir>/src/$1',
    '~/(.*)': '<rootDir>/$1',
  },
  transform: {
    '\\.pegjs$': '<rootDir>/jest-raw-loader.js',
  },
};

module.exports = createJestConfig(customJestConfig);
