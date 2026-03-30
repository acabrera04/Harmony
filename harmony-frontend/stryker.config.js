/**
 * Mutate only frontend source files and let Jest keep driving the same test
 * environment the app already uses for hooks and component coverage.
 */
module.exports = {
  mutate: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/__tests__/**', '!src/**/*.test.{ts,tsx}'],
  testRunner: 'jest',
  checkers: ['typescript'],
  coverageAnalysis: 'perTest',
  reporters: ['clear-text', 'progress', 'html'],
  tempDirName: '.stryker-tmp',
  // The frontend Jest suite currently transpiles a few test-only helpers that
  // do not pass a full TypeScript program check. Point Stryker at production
  // sources so mutation-time type checking stays useful without widening scope.
  tsconfigFile: 'tsconfig.stryker.json',
  jest: {
    configFile: 'jest.config.js',
  },
};
