'use strict';

const VersionChecker = require('ember-cli-version-checker');
const InElementTransform = require('./lib/in-element-transform');
const RenameInElement = require('./lib/rename-in-element');
const debug = require('debug')('ember-in-element-polyfill');

const MINIMUM_PRIVATE_RFC_COMPLIANT_IN_ELEMENT_EMBER_VERSION = '3.17.0-beta.1';
const MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION = '10.0.0'; // t.b.d

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    if (this.hasPublicInElement()) {
      return;
    }

    if (this.hasPrivateCompliantInElement()) {
      let renameInElementPlugin = this._buildRenamePlugin();
      renameInElementPlugin.parallelBabel = {
        requireFile: __filename,
        buildUsing: '_buildRenamePlugin',
        params: {}
      };
      registry.add('htmlbars-ast-plugin', renameInElementPlugin);
      debug(`adding ember-in-element-polyfill AST transform rename-in-element`);
    } else {
      let inElementPolyfillPlugin = this._buildTransformPlugin();
      inElementPolyfillPlugin.parallelBabel = {
        requireFile: __filename,
        buildUsing: '_buildTransformPlugin',
        params: {}
      };
      registry.add('htmlbars-ast-plugin', inElementPolyfillPlugin);
      debug(`adding ember-in-element-polyfill AST transform in-element-transform`);
    }
  },

  _buildTransformPlugin() {
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

  _buildRenamePlugin() {
    return {
      name: 'ember-in-element-polyfill',
      plugin: RenameInElement,
      baseDir() {
        return __dirname;
      },
      cacheKey() {
        return 'ember-in-element-polyfill';
      }
    };
  },

  treeForAddon() {
    if (!this.hasPrivateCompliantInElement()) {
      return this._super.treeForAddon.apply(this, arguments);
    }
  },

  treeForApp() {
    if (!this.hasPrivateCompliantInElement()) {
      return this._super.treeForApp.apply(this, arguments);
    }
  },

  hasPublicInElement() {
    // @todo once https://github.com/emberjs/rfcs/pull/287 is accepted and implemented, this function should return
    // true for any Ember version that already ships a public `in-element`!
    this.ensureEmberVersion();
    return this.emberVersion.gte(MINIMUM_PUBLIC_IN_ELEMENT_EMBER_VERSION);
  },

  hasPrivateCompliantInElement() {
    this.ensureEmberVersion();
    return this.emberVersion.gte(MINIMUM_PRIVATE_RFC_COMPLIANT_IN_ELEMENT_EMBER_VERSION);
  },

  ensureEmberVersion() {
    if (!this.emberVersion) {
      let checker = new VersionChecker(this);
      this.emberVersion = checker.forEmber();
      debug(`Detected Ember version ${this.emberVersion.version}`);
    }
  }
};
