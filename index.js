/* eslint-env node */
'use strict';

const VersionChecker = require('ember-cli-version-checker');
const InElementTransform = require('./lib/in-element-transform');
const InElementWormholeTransform = require('./lib/in-element-wormhole-transform');

const MINIMUM_IN_ELEMENT_EMBER_VERSION = '2.10.0';

module.exports = {
  name: 'ember-in-element-polyfill',

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'ember-in-element-polyfill',
      plugin: this.needsWormholePolyfill() ? InElementWormholeTransform : InElementTransform,
      baseDir() {
        return __dirname;
      },
      cacheKey() {
        return 'ember-in-element-polyfill';
      },
    });
  },

  shouldIncludeChildAddon(addon) {
    if (addon.name === 'ember-wormhole') {
      return this.needsWormholePolyfill();
    }
    return this._super.shouldIncludeChildAddon.apply(this, arguments);
  },

  needsWormholePolyfill() {
    if (!this.emberDep) {
      let checker = new VersionChecker(this);
      this.emberDep = checker.forEmber();
    }
    return this.emberDep.lt(MINIMUM_IN_ELEMENT_EMBER_VERSION);
  }
};
