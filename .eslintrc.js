module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ],
  rules: {
    'class-methods-use-this': ["error", {"exceptMethods": ['render', 'style', 'events']}]
  }
};
