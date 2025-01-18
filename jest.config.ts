import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['__tests__/**/*.[jt]s?(x)', '!**/*.stories.[jt]s?(x)'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
    /*
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$":
      "<rootDir>/src/__mocks__/ImageMock.js",
    */
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest'
  },
  transformIgnorePatterns: ['node_modules/(?!.*/)']
}

export default config
