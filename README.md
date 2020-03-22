# ember-in-element-polyfill

[![Build Status](https://github.com/kaliber5/ember-in-element-polyfill/workflows/CI/badge.svg)](https://github.com/kaliber5/ember-in-element-polyfill/actions)
[![Ember Observer Score](https://emberobserver.com/badges/ember-in-element-polyfill.svg)](https://emberobserver.com/addons/ember-in-element-polyfill)
[![npm version](https://badge.fury.io/js/ember-in-element-polyfill.svg)](https://badge.fury.io/js/ember-in-element-polyfill)


This will make `in-element` (see [RFC 287](https://github.com/emberjs/rfcs/pull/287)) available in all Ember versions
starting at 2.12.

For Ember versions without native support this addon will use the already available private `-in-element`, using an AST 
transform, so no run-time overhead will occur. 

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-in-element-polyfill
```


Usage
------------------------------------------------------------------------------

Install the polyfill and use `{{#in-element}}` as specified in [RFC 287](https://github.com/emberjs/rfcs/pull/287).


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
