/**
 * @author Charlike Mike Reagent <open.source.charlike@gmail.com>
 * @copyright 2017 tunnckoCore, Inc. and other contributors
 * @license MIT
 */

const builtins = require('builtin-modules')
const { pkg, createConfig, createBabel } = require('./base')

const config = createConfig({
  input: 'test/index.js',
  output: { file: 'dist/test.js', format: 'cjs' },
  external: Object.keys(pkg.dependencies || {})
    .concat(Object.keys(pkg.devDependencies))
    .concat(builtins),
  plugins: [createBabel({ targets: { node: 6 }, plugins: ['istanbul'] })],
})

// don't remove assert, cuz we are in test environment
config.plugins = config.plugins.filter((plugin) => plugin.name !== 'unassert')

module.exports = config
