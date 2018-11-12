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

  var isArray = Array.isArray
  return unrollElement

  function unrollElement (el, resolveFn, context) {
    var type
    var children

    if (isArray(el)) {
      return unrollElementList(el, resolveFn, context)
    }

    if (!el || typeof el !== 'object') {
      return el
    }

    type = el.type

    if (typeof type === 'function') {
      return unrollElement(type(el.props), resolveFn, context)
    }

    children = el.props.children

    if (type && type.toString() === 'Symbol(react.fragment)') {
      return unrollElement(children, resolveFn, context)
    }

    return resolveFn(
      el,
      flatten(unrollElement(children, resolveFn, context)),
      context
    )
  }

  function unrollElementList (els, resolveFn, context) {
    var n = els.length
    var i = -1
    var res = []
    while (++i < n) res.push(unrollElement(els[i], resolveFn, context))
    return new List(res)
  }

  function flatten (obj) {
    if (!(obj instanceof List)) {
      return obj
    }

    var res = []
    var vals = obj.vals
    var n = vals.length
    var i = -1
    var v

    while (++i < n) {
      v = vals[i]

      if (v instanceof List) {
        pushMany(res, flatten(v.vals))
      } else {
        res.push(v)
      }
    }

    return res
  }

  function pushMany (collection, vals) {
    var n = vals.length
    var i = -1
    while (++i < n) collection.push(vals[i])
  }

  function List (vals) {
    this.vals = vals
  }
})
