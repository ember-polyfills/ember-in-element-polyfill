# ember-in-element-polyfill

[![Build Status](https://travis-ci.org/kaliber5/ember-in-element-polyfill.svg?branch=master)](https://travis-ci.org/kaliber5/ember-in-element-polyfill)

This will make `in-element` (see [RFC 287](https://github.com/emberjs/rfcs/pull/287)) available in all Ember versions
starting at 1.13.

For Glimmer2 based Ember versions (2.10+) this addon will use the already available private `-in-element`, while for 
earlier versions (1.13 - 2.9) it will use a fallback based on [ember-wormhole](https://github.com/yapplabs/ember-wormhole). 

All of this is done using AST transforms, so no run-time overhead will occur.
