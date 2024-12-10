import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  ignorePatterns: ['dist', 'node_modules'],
  typescript: true,
  vue: true,
  transformers: true,
});
