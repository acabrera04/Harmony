/**
 * Keep mutation scope on application sources so Stryker measures production
 * behavior without spending time mutating generated or test-only files.
 */
module.exports = {
  mutate: ['src/**/*.ts', '!src/**/*.d.ts'],
  testRunner: 'jest',
  checkers: ['typescript'],
  coverageAnalysis: 'perTest',
  reporters: ['clear-text', 'progress', 'html'],
  tempDirName: '.stryker-tmp',
  tsconfigFile: 'tsconfig.test.json',
  jest: {
    configFile: 'jest.config.js',
  },
};
