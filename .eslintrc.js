module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'next',
    // 'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    // 'airbnb',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.next/*', '.eslintrc.js', 'next.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {},
  globals: {
    React: true,
  },
}
