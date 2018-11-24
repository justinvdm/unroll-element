# unroll-element

[![Build Status](https://travis-ci.org/justinvdm/unroll-element.svg?branch=master)](https://travis-ci.org/justinvdm/unroll-element)

Simple utility for unrolling react elements with function-based components as their types. Useful when using jsx for static, non-react use cases (e.g. a pdf renderer).

```js
import unrollElement from 'unroll-element'

const Report = ({ title }) => (
  <document>
    <text>{title}</text>
  </document>
);

unrollElement(<Report title='A report!' />, (el, children) =>
 [el.type, children]);
// => ['document', ['text', 'A report!']]
```

## api

### `unrollElement(el, resolverFn[, context])`
Takes in a react element `el` and returns a tree of objects, where each object is a result returned by `resolverFn`.

`resolverFn` has the form `(el, children, i, context)`, where `el` is a [host element](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements) to resolve, `children` is its resolved children and `i` is the index of element `el` in its parent's `children` after flattening arrays and fragments, or `null` if there is only a single child in the parent, or if `el` is the root element.

For elements with a single child, the resolved child is passed as `children`. For elements with multiple children, an array of resolved children is passed as `children`. For leaf elements, `children` is the value the of the element's `'children'` prop, or `undefined` if no such prop exists. Non-element child values are not passed to `resolveFn`, and are instead used as is. Fragment and array child values are flattened before being passed as `children`.

An optional `context` can be given to `unrollElement`, which is then passed as an argument for each call to `resolverFn`.

## install

```
npm install unroll-element
```
