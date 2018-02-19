/* eslint-disable import/no-extraneous-dependencies, global-require */
/* global module, require */

module.exports = ctx => ({
  plugins: [
    require('postcss-import')({ addDependencyTo: ctx.webpack }),
    require('postcss-cssnext'),
  ],
});
