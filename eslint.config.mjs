import nextConfig from 'eslint-config-next'
import boundaries from 'eslint-plugin-boundaries'

const FSD_ELEMENTS = [
  { type: 'app', pattern: 'src/app/**' },
  { type: 'pages', pattern: 'src/views/*/**', capture: ['slice'] },
  { type: 'widgets', pattern: 'src/widgets/*/**', capture: ['slice'] },
  { type: 'features', pattern: 'src/features/*/**', capture: ['slice'] },
  { type: 'entities', pattern: 'src/entities/*/**', capture: ['slice'] },
  { type: 'shared', pattern: 'src/shared/**' },
]

const config = [
  ...nextConfig,
  {
    plugins: { boundaries },
    settings: {
      'boundaries/elements': FSD_ELEMENTS,
      'boundaries/ignore': ['**/*.test.*', '**/*.config.*'],
      'boundaries/legacy-warnings': false,
    },
    rules: {
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
    rules: {
      'react/no-danger': 'warn',
    },
  },
]

export default config
