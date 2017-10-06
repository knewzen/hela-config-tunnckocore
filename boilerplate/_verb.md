<p align="center">
  <img align="center" src="https://cdn.jsdelivr.net/emojione/assets/svg/1f54e.svg" width="256" height="256" alt="Parse a function">
</p>

# {%= name %} [![npm version][npmv-img]][npmv-url] [![github release][github-release-img]][github-release-url] [![mit License][license-img]][license-url] [![NPM Downloads Weekly][downloads-weekly-img]][downloads-weekly-url] [![NPM Downloads Total][downloads-total-img]][downloads-total-url] 

> {%= description %}

<div id="thetop"></div>

{%= include('highlight') %}

## Quality Assurance :100:

[![Code Climate][codeclimate-img]][codeclimate-url] 
[![Code Style Standard][standard-img]][standard-url] 
[![Linux Build][travis-img]][travis-url] 
[![Code Coverage][codecov-img]][codecov-url] 
[![Dependencies Status][dependencies-img]][dependencies-url] 
[![Renovate App Status][renovate-img]][renovate-url] 

If you have any _how-to_ kind of questions, please read [Code of Conduct](./CODE_OF_CONDUCT.md) and **join the chat** room or [open an issue][open-issue-url].  
You may also read the [Contributing Guide](./CONTRIBUTING.md). There, beside _"How to contribute?"_, we describe everything **_stated_** by  the badges.

[![tunnckoCore support][gitterchat-img]][gitterchat-url] 
[![Code Format Prettier][prettier-img]][prettier-url] 
[![node security status][nodesecurity-img]][nodesecurity-url] 
[![conventional Commits][ccommits-img]][ccommits-url] 
[![semantic release][semantic-release-img]][semantic-release-url] 
[![Node Version Required][nodeversion-img]][nodeversion-url]

## Table of Contents
<!-- toc -->

## Install

This project requires [**Node.js**][nodeversion-url] **v{%= engines.node.slice(2) %}** and above. Use [**yarn**](https://yarnpkg.com) **v{%= engines.yarn.slice(2) %}** / [**npm**](https://www.npmjs.com) **v{%= engines.npm.slice(2) %}** or above to install it.

```
$ yarn add {%= name %}
```

**[back to top](#thetop)**

## API
Review carefully the provided examples and the working [tests](./test/index.js).

{%= apidocs('src/index.js') %}

**[back to top](#thetop)**

{% if (verb.related && verb.related.list && verb.related.list.length) { %}
## Related
{%= related(verb.related.list, { words: 12 }) %}
{% } %}

**[back to top](#thetop)**

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue][open-issue-url].  
Please read the [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md) documents for advices.  

## Author
- [github/tunnckoCore](https://github.com/tunnckoCore)
- [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
- [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
{%= copyright({ start: licenseStart, linkify: true, prefix: 'Copyright', symbol: '©' }) %} {%= licenseStatement %}

***

{%= include('footer') %}  
Project scaffolded and managed with [hela][].

{%= reflinks(verb.reflinks) %}


<!-- Heading badges -->
[npmv-url]: https://www.npmjs.com/package/{%= name %}
[npmv-img]: https://img.shields.io/npm/v/{%= name %}.svg

[open-issue-url]: https://github.com/{%= repository %}/issues/new
[github-release-url]: https://github.com/{%= repository %}/releases/latest
[github-release-img]: https://img.shields.io/github/release/{%= repository %}.svg

[license-url]: https://github.com/{%= repository %}/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/{%= name %}.svg

[downloads-weekly-url]: https://www.npmjs.com/package/{%= name %}
[downloads-weekly-img]: https://img.shields.io/npm/dw/{%= name %}.svg

[downloads-total-url]: https://www.npmjs.com/package/{%= name %}
[downloads-total-img]: https://img.shields.io/npm/dt/{%= name %}.svg

<!-- Front line badges -->
[codeclimate-url]: https://codeclimate.com/github/{%= repository %}
[codeclimate-img]: https://img.shields.io/codeclimate/github/{%= repository %}.svg

[standard-url]: https://github.com/standard/standard
[standard-img]: https://img.shields.io/badge/code_style-standard-brightgreen.svg

[travis-url]: https://travis-ci.org/{%= repository %}
[travis-img]: https://img.shields.io/travis/{%= repository %}/master.svg?label=linux

[codecov-url]: https://codecov.io/gh/{%= repository %}
[codecov-img]: https://img.shields.io/codecov/c/github/{%= repository %}/master.svg

[dependencies-url]: https://david-dm.org/{%= repository %}
[dependencies-img]: https://img.shields.io/david/{%= repository %}.svg

[renovate-url]: https://renovateapp.com
[renovate-img]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg

<!-- Second front of badges -->

[gitterchat-url]: https://gitter.im/tunnckoCore/support
[gitterchat-img]: https://img.shields.io/gitter/room/tunnckoCore/support.svg

[prettier-url]: https://github.com/prettier/prettier
[prettier-img]: https://img.shields.io/badge/styled_with-prettier-f952a5.svg

[nodesecurity-url]: https://nodesecurity.io/orgs/tunnckocore-dev/projects/{%= nspId %}
[nodesecurity-img]: https://nodesecurity.io/orgs/tunnckocore-dev/projects/{%= nspId %}/badge
<!-- the original color of nsp: 
[nodesec-img]: https://img.shields.io/badge/nsp-no_known_vulns-35a9e0.svg -->

[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-img]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[ccommits-url]: https://conventionalcommits.org/
[ccommits-img]: https://img.shields.io/badge/conventional_commits-1.0.0-yellow.svg

[nodeversion-url]: https://nodejs.org/en/download
[nodeversion-img]: https://img.shields.io/node/v/{%= name %}.svg
