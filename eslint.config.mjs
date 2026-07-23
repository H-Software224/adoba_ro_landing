import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import boundaries from 'eslint-plugin-boundaries'
import globals from 'globals'

const FSD_ELEMENTS = [
  { type: 'app', pattern: 'src/app/**' },
  { type: 'pages', pattern: 'src/views/*/**', capture: ['slice'] },
  { type: 'widgets', pattern: 'src/widgets/*/**', capture: ['slice'] },
  { type: 'features', pattern: 'src/features/*/**', capture: ['slice'] },
  { type: 'entities', pattern: 'src/entities/*/**', capture: ['slice'] },
  { type: 'shared', pattern: 'src/shared/**' },
]

const config = [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      'boundaries/elements': FSD_ELEMENTS,
      'boundaries/ignore': ['**/*.test.*', '**/*.config.*'],
      'boundaries/legacy-warnings': false,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['app', 'pages', 'widgets', 'shared'] },
            {
              from: 'pages',
              allow: [['pages', { slice: '${from.slice}' }], 'widgets', 'features', 'entities', 'shared'],
            },
            {
              from: 'widgets',
              allow: [['widgets', { slice: '${from.slice}' }], 'features', 'entities', 'shared'],
            },
            {
              from: 'features',
              allow: [['features', { slice: '${from.slice}' }], 'entities', 'shared'],
            },
            {
              from: 'entities',
              allow: [['entities', { slice: '${from.slice}' }], 'shared'],
            },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
      // NOTE: index.ts-only exposure (CLAUDE.md rule) is not enforced here.
      // eslint-plugin-boundaries@7's entry-point rule checks internal barrel
      // re-exports the same as external imports, so it can't distinguish
      // "index.ts importing its own slice" from "another slice reaching in" —
      // enforce that convention via review instead.
    },
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
]

export default config
