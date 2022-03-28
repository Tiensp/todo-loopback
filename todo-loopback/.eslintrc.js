module.exports = {
  extends: '@loopback/eslint-config',

  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'parameter',
        format: [
          'camelCase',
          'strictCamelCase',
          'PascalCase',
          'StrictPascalCase',
          'snake_case',
          'UPPER_CASE',
        ],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
  },
};
