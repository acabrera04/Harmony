import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  sonarjs.configs.recommended,
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // Allow intentionally-unused params/vars prefixed with _ (e.g. _password, _serverId).
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: [
      'src/components/layout/HarmonyShell.tsx',
      'src/contexts/VoiceContext.tsx',
      'tests/e2e/support/start-backend-e2e.mjs',
    ],
    rules: {
      'sonarjs/cognitive-complexity': 'off',
    },
  },
  {
    files: ['src/contexts/VoiceContext.tsx'],
    rules: {
      'sonarjs/no-nested-functions': 'off',
    },
  },
  {
    files: ['tests/e2e/support/start-backend-e2e.mjs'],
    rules: {
      'sonarjs/no-os-command-from-path': 'off',
    },
  },
]);

export default eslintConfig;
