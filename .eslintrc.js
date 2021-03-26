module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', '@typescript-eslint', 'ts-exports', '10x'],
  rules: {
    'ts-exports/unused-exports': 2,
    '10x/auto-import': [
      'error',
      {
        imports: {
          useRef: "import {useRef} from 'react'",
          useEffect: "import {useEffect} from 'react'",
          useState: "import {useState} from 'react'",
          useCallback: "import {useCallback} from 'react'",
        },
      },
    ],
  },
};
