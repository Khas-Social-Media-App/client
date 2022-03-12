module.exports = {
    env: {
        browser: true,
        'react-native/react-native': true,
        es2020: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'airbnb'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        },
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: [ 'react', 'react-native', 'react-hooks', 'prettier' ],
    rules: {
        indent: [ 'error', 4, { SwitchCase: 1 }],
        'linebreak-style': [ 'error', 'unix', 'windows' ],
        quotes: [ 2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'comma-dangle': [ 2, 'never' ],
        semi: [ 2, 'never' ],
        'max-len': [
            'error',
            200,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        'max-classes-per-file': [ 'error', 1 ],
        'no-underscore-dangle': [ 'error', { allow: [ '_id', '__v', '__t' ] }], // allow use of '_id' property
        'no-use-before-define': [
            'error',
            { functions: true, classes: false, variables: false }
        ],
        'jsx-quotes': [ 2, 'prefer-single' ],
        'newline-before-return': 2,
        'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false }],
        'no-multiple-empty-lines': [ 'error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'react/jsx-indent': [ 'error', 4 ],
        'react/function-component-definition': 'off',
        radix: 'off',
        'consistent-return': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': [ 'error', {
            vars: 'all', caughtErrors: 'all', args: 'after-used', ignoreRestSiblings: false
        }],
        'react/prop-types': 'off',
        'react/jsx-indent-props': [ 'error', 4 ],
        'react/jsx-closing-bracket-location': [
            2,
            {
                nonEmpty: 'after-props',
                selfClosing: 'after-props'
            }
        ],
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                },
                ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
                ImportDeclaration: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                },
                ExportDeclaration: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                }
            }
        ],

        'react-native/no-unused-styles': 'off', // 2
        'react-native/split-platform-components': 2,
        'react-native/no-inline-styles': 2,
        'react-native/no-raw-text': 2,
        'prettier/prettier': 'error',
        'import/order': [
            'error',
            {
                groups: [ 'builtin', 'external', 'internal' ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before'
                    },
                    {
                        pattern: '*.png',
                        group: 'sibling',
                        patternOptions: { matchBase: true },
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: [ 'react' ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
            }
        },
        react: {
            version: 'detect'
        },
        'import/ignore': [ 'react-native' ]
    }
}
