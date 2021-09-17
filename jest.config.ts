import { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	verbose: true,
	clearMocks: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['../src/**/*.ts', '!../src/frameworks/**'],
	coveragePathIgnorePatterns: ['/node_modules/'],
	testEnvironment: 'node',
	coverageProvider: 'v8',
	rootDir: 'tests',
	testMatch: ['**/tests/**/*.(spec|test).[jt]s'],
	setupFiles: ['../jest-setup-file.ts'],
	moduleNameMapper: {
		'@domain/(.*)': '<rootDir>/../src/domain/$1',
		'@business/(.*)': '<rootDir>/../src/business/$1',
		'@controller/(.*)': '<rootDir>/../src/controller/$1',
		'@framework/(.*)': '<rootDir>/../src/framework/$1',
		'@shared/(.*)': '<rootDir>/../src/shared/$1',
		'@tests/(.*)': '<rootDir>/$1',
		'@root/(.*)': '<rootDir>/../$1',
	},
}

export default config
