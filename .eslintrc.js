/* eslint-disable */
module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        "standard",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "airbnb",
        "airbnb-typescript",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-explicit-any": 2,
        "react/jsx-props-no-spreading": "off",
    },
    settings: {
        react: {
            version: "detect"
        },
    },
    ignorePatterns: "./eslintrc.js"
};
