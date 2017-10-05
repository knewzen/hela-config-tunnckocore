/* eslint-disable max-len */

const fs = require('fs')
const path = require('path')
const pMap = require('p-map')

const FOLDER = __dirname

const BINDIR = path.join(FOLDER, 'node_modules', '.bin')

const cwd = (val) => (val ? path.join(process.cwd(), val) : process.cwd())
const pkg = require(cwd('package.json')) // todo

// workaround for using `hela` to build itself :D
const helaBin = (v) => (v.name === 'hela' ? cwd(v.bin.hela) : 'yarn start')
const hela = helaBin(pkg)

const readdir = function readdirPromise (src) {
  return new Promise((resolve, reject) => {
    fs.readdir(src, (er, filepaths) => {
      if (er) return reject(er)
      resolve(filepaths)
    })
  })
}

const copyFile = function copyFile (srcPath, destPath) {
  return new Promise((resolve, reject) => {
    const localConfig = path.join(FOLDER, srcPath)
    const newConfig = cwd(destPath || srcPath)

    const src = fs.createReadStream(localConfig).once('error', reject)
    const dest = fs.createWriteStream(newConfig).once('error', reject)

    src
      .pipe(dest)
      .once('error', reject)
      .once('close', () => resolve())
  })
}

const renovate = () => copyFile('renovate.json')
const update = () =>
  readdir(path.join(FOLDER, 'boilerplate')).then((fps) => {
    const whitelist = [
      '.codeclimate.yml',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc.json',
      '.gitattributes',
      '.gitignore',
      '.prettierrc',
      '.travis.yml',
      'CODE_OF_CONDUCT.md',
      'CONTRIBUTING.md',
      'renovate.json',
    ]

    const list = fps.filter((fp) => whitelist.includes(fp))

    return pMap(list, (fp) => copyFile(fp), { concurrency: 1 })
  })

/**
 * Script for [prettier][] formatter.
 * It respects Prettier's `.prettierrc` config file.
 *
 * ```
 * hela format
 * # or
 * npm start format
 * # or
 * yarn start format
 * ```
 *
 * @name format
 * @api public
 */

const format = `${BINDIR}/prettier ${pkg.src} --config ${cwd(
  '.prettierrc'
)} --write`

/**
 * Script for linting, using [eslint][]. It respects
 * the ESLint's config file resolving in current working directory.
 *
 * ```
 * hela lint
 * # or
 * npm start lint
 * # or
 * yarn start lint
 * ```
 *
 * @name lint
 * @api public
 */

const lint = `${BINDIR}/eslint ${pkg.src} --config ${cwd(
  '.eslintrc.json'
)} -f codeframe --fix`

/**
 * Runs [format](#format) and [lint](#lint) tasks in series.
 *
 * ```
 * hela style
 * # or
 * npm start style
 * # or
 * yarn start style
 * ```
 *
 * @name style
 * @api public
 */

const style = [`${hela} format`, `${hela} lint`]

/**
 * Deletes `dist/` folder in current working directory,
 * using [rimraf][]
 *
 * ```
 * hela clean
 * # or
 * npm start clean
 * # or
 * yarn start clean
 * ```
 *
 * @name clean
 * @api public
 */

const clean = `${BINDIR}/rimraf ${cwd('dist')}`

/**
 * Runs [clean](#clean) task, deletes `node_modules/` folder
 * and runs `yarn install --offline`.
 * Be aware of that Yarn may fail,
 * if you don't have some module in the cache,
 * so run it without `--offline` flag.
 *
 * ```
 * hela fresh
 * # or
 * npm start fresh
 * # or
 * yarn start fresh
 * ```
 *
 * @name fresh
 * @api public
 */

const fresh = [
  `${hela} clean`,
  `${BINDIR}/rimraf ${cwd('node_modules')}`,
  'yarn install',
]

/**
 * Runs [verb][] directly, so it will respect its
 * configuration places, such as `verb` field in `package.json`
 * of the current working directory.
 *
 * ```
 * hela docs
 * # or
 * npm start docs
 * # or
 * yarn start docs
 * ```
 *
 * @name docs
 * @api public
 */

const docs = `${BINDIR}/verb`

/**
 * Runs the tests using [rollup][] and [nyc][].
 * That task generates coverage `lcov` report, runs `nyc report`
 * and `nyc check-coverage`. The very important thing is that,
 * that Rollup bundles the `test/index.js` path,
 * using [config/test.js](./config/test.js) config which includes
 * [babel][], [babel-preset-env][] and [babel-plugin-istanbul][].
 * So any awesome features are available in your tests, including
 * the `Object rest spread transform` and ES Modules.
 *
 * ```
 * hela test
 * # or
 * npm start test
 * # or
 * yarn start test
 * ```
 *
 * @name test
 * @api public
 */

const test = [
  `${BINDIR}/rollup -c ${FOLDER}/config/test.js`,
  `${BINDIR}/nyc --cwd=${cwd()} --reporter=lcov node ${cwd('dist/test.js')}`,
  `${BINDIR}/nyc --cwd=${cwd()} report`,
  `${BINDIR}/nyc --cwd=${cwd()} check-coverage`,
]

/**
 * Runs [clean](#clean), [build:node](#buildnode) and [build:browser](#buildbrowser) tasks
 * and creates three bundles - CJS, ES, UMD.
 *
 * ```
 * hela build
 * # or
 * npm start build
 * # or
 * yarn start build
 * ```
 *
 * @name build
 * @api public
 */

const build = [`${hela} clean`, `${hela} build:node`, `${hela} build:browser`]

module.exports = {
  format,
  lint,
  style,
  docs,
  renovate,
  update,

  clean,
  fresh,

  test,
  build,

  /**
   * Generates `dist/index.js` bundle,
   * using [config/node.js](./config/node.js) Rollup config.
   * This config inherits from [config/base.js](./config/base.js)
   * which includes [rollup-plugin-babel][], [babel-plugin-transform-object-rest-spread][]
   * and JSX [babel-plugin-transform-react-jsx][] with pragma `h`.
   *
   * ```
   * hela build:node
   * # or
   * npm start build:node
   * # or
   * yarn start build:node
   * ```
   *
   * @name build:node
   * @api public
   */

  'build:node': `${BINDIR}/rollup -c ${FOLDER}/config/node.js`,

  /**
   * Runs [build:browser:modern](buildbrowsermodern)
   * and [build:browser:legacy](#buildbrowserlegacy) tasks.
   * This config inherits from [config/base.js](./config/base.js)
   * which includes [rollup-plugin-babel][], [babel-plugin-transform-object-rest-spread][]
   * and JSX [babel-plugin-transform-react-jsx][] with pragma `h`
   * and generates `dist/index.min.js` & `dist/index.umd.js` and respective
   * `.gz` files for them, of course.
   *
   * > See http://j.mp/es2015-in-production for more info.
   *
   * ```
   * hela build:browser
   * # or
   * npm start build:browser
   * # or
   * yarn start build:browser
   * ```
   *
   * @name build:browser
   * @api public
   */

  'build:browser': [
    `${hela} build:browser:modern`,
    `${hela} build:browser:legacy`,
  ],

  /**
   * Runs Rollup with [config/modern-browsers.js](./config/modern-browsers.js)
   * config. And generates `dist/index.min.js` is so called "modern" minified bundle which
   * is an ES module, suitable for latest browsers that supports
   * the `<script type="module"></script>` specification,
   * see [config/modern-browsers.js#L24-L30](./config/modern-browsers.js#L24-L30).
   *
   * > See http://j.mp/es2015-in-production for more info.
   *
   * ```
   * hela build:browser:modern
   * # or
   * npm start build:browser:modern
   * # or
   * yarn start build:browser:modern
   * ```
   *
   * @name build:browser:modern
   * @api public
   */

  'build:browser:modern': `${BINDIR}rollup -c ${FOLDER}/config/modern-browsers.js`,

  /**
   * Runs Rollup with [config/legacy-browsers.js](./config/legacy-browsers.js)
   * config. And generates `dist/index.umd.js` which is an UMD bundle
   * for currently "old" browsers like `browsers: 'last 2 versions'` option.
   *
   * > See http://j.mp/es2015-in-production for more info.
   *
   * ```
   * hela build:browser:legacy
   * # or
   * npm start build:browser:legacy
   * # or
   * yarn start build:browser:legacy
   * ```
   *
   * @name build:browser:legacy
   * @api public
   */

  'build:browser:legacy': `${BINDIR}/rollup -c ${FOLDER}/config/legacy-browsers.js`,

  /**
   * Runs [style](#style) & [build](#build) tasks and calls
   * the [semantic-release][] `pre`, `npm publish` and `post`.
   * This is intended the be used only on CI, like Travis CI,
   * so you can configure `after_success` hook to `yarn start release`.
   *
   * ```
   * hela release
   * # or
   * npm start release
   * # or
   * yarn start release
   * ```
   *
   * @name release
   * @api public
   */

  release: [
    `${hela} style`,
    `${hela} build`,
    'semantic-release pre',
    'npm publish',
    'semantic-release post',
  ],

  /**
   * Runs `git status --porcelain`, [style](#style) & [test](#test) tasks
   * and `git add --all`.
   *
   * ```
   * hela precommit
   * # or
   * npm start precommit
   * # or
   * yarn start precommit
   * ```
   *
   * @name precommit
   * @api public
   */

  precommit: [
    'git status --porcelain',
    `${hela} style`,
    `${hela} test`,
    'git add --all',
  ],

  /**
   * Runs [simple-commit-message][] wizard helper to prompt
   * the user for interaction to build valid commit message,
   * against the [Conventional Commits][ccommits-url] v1 specification.
   * After that it `git push` automatically.
   *
   * ```
   * hela commit
   * # or
   * npm start commit
   * # or
   * yarn start commit
   * ```
   *
   * @name commit
   * @api public
   */

  commit: [`${BINDIR}/simple-commit-message`],
}
