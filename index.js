;(function (root, factory) {
  if (typeof root.define === 'function' && root.define.amd) {
    root.define(function () {
      return factory()
    })
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.unrollElement = factory()
  }
})(this || 0, function () {
  'use strict'
})
