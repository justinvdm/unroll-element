# unroll-element

[![Build Status](https://travis-ci.org/justinvdm/unroll-element?branch=master)](https://travis-ci.org/justinvdm/unroll-element)

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

### `unrollElement(el, resolverFn)`
Takes in a react element `el` and returns a tree of objects, where each object is a result returned by `resolverFn`.

`resolverFn` has the form `(el, children)`, where `el` is a [host element](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements) to resolve, and `children` is its resolved children. For elements with a single child, the resolved child is passed as `children`. For elements with multiple children, an array of resolved children is passed as `children`. For leaf elements, `children` is the value the element's `'children'` prop, or `undefined` if no such prop exists. Non-element child values are not passed to `resolveFn`, and are instead used as is. Fragment and array child values are flattened before being passed as `children`.

## install

```
npm install unroll-element
```
