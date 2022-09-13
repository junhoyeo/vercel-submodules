module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  semi: true,
  overrides: [
    {
      files: 'src/commands/*',
      options: {
        printWidth: 150,
      },
    },
  ],

  // @ianvs/prettier-plugin-sort-imports
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '@/(assets|components|hooks|pages|recoil|styles|utils)/(.*)$',
    '@/(.*)$',
    '^[./](.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('@ianvs/prettier-plugin-sort-imports')],
};
