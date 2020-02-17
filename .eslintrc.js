module.exports = {
    "plugins": ["jest"],
    "env": {
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": "off"
    }
};