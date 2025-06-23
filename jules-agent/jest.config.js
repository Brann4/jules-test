module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'], // Optional: for global test setup
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/test.ts', // Default Angular test entry file, not needed for Jest
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  moduleNameMapper: {
    // Handle module name mapping if you have path aliases in tsconfig
    // e.g., '@app/(.*)': '<rootDir>/src/app/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'] // Important for Angular 13+ with ESM packages
};
