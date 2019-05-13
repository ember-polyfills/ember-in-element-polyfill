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

    let plugins = registry.load('htmlbars-ast-plugin');
    let maybeInElementPlugin = plugins.find((plugin) => plugin.name === 'ember-maybe-in-element-transform');
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

    // Yes, this a bit ugly, but it seems for some Ember versions (more specifically ember-temmplate-compiler probably)
    // AST plugins are applied in a different order (reversed?) than the order they are added to the registry.
    // With this dirty hack we make sure there is always a "polyfill" transform running after the "maybe" transform, to make
    // sure the AST returned from "maybe" containing `-in-element` gets further transformed to use `ember-wormhole` instead!
    if (maybeInElementPlugin) {
      registry.remove('htmlbars-ast-plugin', maybeInElementPlugin);
      registry.add('htmlbars-ast-plugin', maybeInElementPlugin);
      registry.add('htmlbars-ast-plugin', inElementPolyfillPlugin);
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
