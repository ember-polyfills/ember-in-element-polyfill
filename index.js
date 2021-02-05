'use strict';

const VersionChecker = require('ember-cli-version-checker');
const InElementTransform = require('./lib/in-element-transform');
const debug = require('debug')('ember-in-element-polyfill');

const MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION = '3.20.0-beta.0';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    if (this.hasPublicInElement()) {
      return;
    }

    let inElementPolyfillPlugin = this._buildPlugin();
    inElementPolyfillPlugin.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildPlugin',
      params: {}
    };
    registry.add('htmlbars-ast-plugin', inElementPolyfillPlugin);
    debug(`adding AST transform ember-in-element-polyfill`);
  },

  _buildPlugin() {
    return {
      name: 'ember-in-element-polyfill',
      plugin: InElementTransform,
      baseDir() {
        return __dirname;
      },
      cacheKey() {
        return 'ember-in-element-polyfill';
      }
    };
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
    this.ensureEmberVersion();
    return this.emberVersion.gte(MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION);
  },

  ensureEmberVersion() {
    if (!this.emberVersion) {
      let checker = new VersionChecker(this.project);
      this.emberVersion = checker.for(`ember-source`);
      debug(`Detected Ember version ${this.emberVersion.version}`);
    }
  }
};
