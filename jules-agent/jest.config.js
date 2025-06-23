module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/test.ts', // Default Angular test entry file (Karma), not needed for Jest
  ],
  // transformIgnorePatterns is important for Angular 13+ or projects with ESM dependencies in node_modules
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  // globals section for ts-jest is deprecated, config is better under transform
  // however, jest-preset-angular might still rely on some globals or set them up.
  // If specific ts-jest config is needed, it should be:
  // transform: {
  //   '^.+\\.(ts|js|html)$': ['ts-jest', { /* ts-jest config here */ }]
  // }
  // For now, rely on jest-preset-angular's defaults which are usually sufficient.
};
