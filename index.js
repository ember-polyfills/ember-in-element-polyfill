'use strict';

const VersionChecker = require('ember-cli-version-checker');
const InElementTransform = require('./lib/in-element-transform');
const debug = require('debug')('ember-in-element-polyfill');

const MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION = '10.0.0'; // t.b.d

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    if (this.hasPublicInElement()) {
      return;
    }

    let inElementPolyfillPlugin = {
      name: 'ember-in-element-polyfill',
      plugin: InElementTransform,
      baseDir() {
        return __dirname;
      },
      cacheKey() {
        return 'ember-in-element-polyfill';
      }
    };
    registry.add('htmlbars-ast-plugin', inElementPolyfillPlugin);
    debug(`adding AST transform ember-in-element-polyfill`);
  },

  treeForAddon() {
    if (!this.hasPublicInElement()) {
      return this._super.treeForAddon.apply(this, arguments);
    }
  },

  treeForApp() {
    if (!this.hasPublicInElement()) {
      return this._super.treeForApp.apply(this, arguments);
    }
  },

  hasPublicInElement() {
    // @todo once https://github.com/emberjs/rfcs/pull/287 is accepted and implemented, this function should return
    // true for any Ember version that already ships a public `in-element`!
    this.ensureEmberVersion();
    return this.emberVersion.gte(MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION);
  },

  ensureEmberVersion() {
    if (!this.emberVersion) {
      let checker = new VersionChecker(this);
      this.emberVersion = checker.forEmber();
      debug(`Detected Ember version ${this.emberVersion.version}`);
    }
  }
};
