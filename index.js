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

  function unrollElement (el, resolveFn, context, i) {
    var type
    var children
    el = flatten(el)

    if (isArray(el)) {
      return unrollElementList(el, resolveFn, context, null)
    }

    if (!el || typeof el !== 'object') {
      return el
    }

    type = el.type

    if (typeof type === 'function') {
      return unrollElement(type(el.props), resolveFn, context, null)
    }

    children = unrollElement(el.props.children, resolveFn, context, null)
    return resolveFn(el, children, i == null ? null : i, context)
  }

  function unrollElementList (els, resolveFn, _, context) {
    var n = els.length
    var i = -1
    var res = []
    while (++i < n) res.push(unrollElement(els[i], resolveFn, context, i))
    return res
  }

  function isFragment (el) {
    return el && el.type && el.type.toString() === 'Symbol(react.fragment)'
  }

  function flatten (rootObj) {
    var pending = [rootObj]
    var res = []
    var obj

    while ((obj = pending.pop())) {
      if (isArray(obj)) {
        pushManyBackwards(pending, obj)
      } else if (isFragment(obj)) {
        pending.push(obj.props.children)
      } else {
        res.push(obj)
      }
    }

    if (res.length === 1 && !isArray(rootObj)) {
      return res[0]
    }

    return res
  }

  function pushManyBackwards (collection, vals) {
    var i = vals.length
    while (i--) collection.push(vals[i])
  }
})
