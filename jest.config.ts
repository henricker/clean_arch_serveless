import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/4-framework/**/*.ts',
    '!src/2-business/dto/**/*.ts',
    '!src/2-business/useCases/*.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/business/module/',
    '.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testEnvironment: 'node',
  coverageProvider: 'v8',
  rootDir: './',
  testMatch: ['**/tests/**/*.(spec|test).[jt]s'],
  setupFiles: ['./jest-setup-file.ts'],
  moduleNameMapper: {
    '@domain/(.*)': '<rootDir>/src/1-domain/$1',
    '@business/(.*)': '<rootDir>/src/2-business/$1',
    '@controller/(.*)': '<rootDir>/src/3-controller/$1',
    '@framework/(.*)': '<rootDir>/src/4-framework/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@root/(.*)': '<rootDir>/$1',
  },
}

export default config
