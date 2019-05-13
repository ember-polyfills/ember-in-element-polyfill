# ember-in-element-polyfill

[![Build Status](https://travis-ci.org/kaliber5/ember-in-element-polyfill.svg?branch=master)](https://travis-ci.org/kaliber5/ember-in-element-polyfill)

This will make `in-element` (see [RFC 287](https://github.com/emberjs/rfcs/pull/287)) available in all Ember versions
starting at 1.13.

For Glimmer2 based Ember versions (2.10+) this addon will use the already available private `-in-element`. For 
earlier versions (1.13 - 2.9), and only for those(!), it will use a fallback based on [ember-wormhole](https://github.com/yapplabs/ember-wormhole). 

All of this is done using AST transforms, so no run-time overhead will occur. 

Also it will play nicely with [ember-maybe-in-element](https://github.com/DockYard/ember-maybe-in-element), in case you have 
a need for the additional `renderInPlace` functionality.


Compatibility
------------------------------------------------------------------------------

* Ember.js v1.13 or above



Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-in-element-polyfill
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
