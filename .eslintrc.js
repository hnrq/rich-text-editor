module.exports = {
  extends: ['react-app', 'airbnb'],
  settings: {
    react: {
      pragma: 'React',
      version: '16.3'
    },
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/button-has-type': 'off',
    'react/no-multi-comp': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/default-props-match-prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'comma-dangle': 'off',
    indent: 'off',
    quotes: 0,
    'no-console': 1,
    'no-debugger': 1,
    'no-var': 1,
    semi: [1, 'always'],
    'class-methods-use-this': 0,
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'no-alert': 0,
    'no-lone-blocks': 0,
    'jsx-quotes': 1,
    'react/display-name': [
      1,
      {
        ignoreTranspilerName: false
      }
    ],
    'react/forbid-prop-types': [
      1,
      {
        forbid: ['any']
      }
    ],
    'react/jsx-boolean-value': 1,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-curly-spacing': 1,
    'react/jsx-indent-props': 0,
    'react/jsx-key': 1,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': 1,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-literals': 0,
    'jsx-a11y/label-has-for': 0,
    'react/jsx-no-undef': 1,
    'react/jsx-pascal-case': 1,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-danger': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-direct-mutation-state': 1,
    'react/no-multi-comp': 1,
    'react/no-set-state': 0,

    'react/no-unknown-property': 1,
    'react/prefer-es6-class': 1,
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 1,
    'react/sort-comp': 1
  }
};
