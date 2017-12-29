/* eslint-env node */
'use strict';

const VersionChecker = require('ember-cli-version-checker');
const InElementTransform = require('./lib/in-element-transform');
const InElementWormholeTransform = require('./lib/in-element-wormhole-transform');

const MINIMUM_PRIVATE_IN_ELEMENT_EMBER_VERSION = '2.10.0';
const MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION = '10.0.0'; // t.b.d

module.exports = {
  name: 'ember-in-element-polyfill',

  setupPreprocessorRegistry(type, registry) {
    if (this.hasPublicInElement()) {
      return;
    }

    registry.add('htmlbars-ast-plugin', {
      name: 'ember-in-element-polyfill',
      plugin: this.hasPrivateInElement() ? InElementTransform : InElementWormholeTransform,
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
      return !this.hasPrivateInElement() && !this.hasPublicInElement();
    }
    return this._super.shouldIncludeChildAddon.apply(this, arguments);
  },

  hasPublicInElement() {
    // @todo once https://github.com/emberjs/rfcs/pull/287 is accepted and implemented, this function should return
    // true for any Ember version that already ships a public `in-element`!
    this.ensureEmberVersion();
    return this.emberVersion.gte(MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION);
  },

  hasPrivateInElement() {
    this.ensureEmberVersion();
    return this.emberVersion.gte(MINIMUM_PRIVATE_IN_ELEMENT_EMBER_VERSION);
  },
  
  ensureEmberVersion() {
    if (!this.emberVersion) {
      let checker = new VersionChecker(this);
      this.emberVersion = checker.forEmber();
    }
  }
};
