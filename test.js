// @flow
const React = require('react')
const test = require('tape')

const unrollElement = require('.')

const resolveFn = (el, content) => {
  const { type: kind, props: { children: _children, ...props } } = el
  return [kind, props, content]
}

test('host elements', t => {
  const testEl = (
    <foo a={2}>
      <bar>21</bar>
      <bar>23</bar>
    </foo>
  )

  const res = unrollElement(testEl, resolveFn)

  t.deepEquals(res, ['foo', { a: 2 }, [['bar', {}, '21'], ['bar', {}, '23']]])
  t.end()
})

test('function components', t => {
  const TestComponent = ({ children, a }) => <bar a={a}>{children}</bar>

  const testEl = (
    <foo>
      <TestComponent a={2}>
        <baz>21</baz>
      </TestComponent>
    </foo>
  )

  const res = unrollElement(testEl, resolveFn)

  t.deepEquals(res, ['foo', {}, ['bar', { a: 2 }, ['baz', {}, '21']]])
  t.end()
})

test('array-returning components', t => {
  const TestComponent = () => [<bar>2</bar>, [<baz>3</baz>, <quux>23</quux>]]

  const testEl = (
    <foo>
      <TestComponent />
    </foo>
  )

  const res = unrollElement(testEl, resolveFn)

  t.deepEquals(res, [
    'foo',
    {},
    [['bar', {}, '2'], ['baz', {}, '3'], ['quux', {}, '23']]
  ])

  t.end()
})

test('fragment-returning components', t => {
  const TestComponent = () => (
    <React.Fragment>
      <bar>2</bar>
      <React.Fragment>
        <baz>3</baz>
        <quux>23</quux>
      </React.Fragment>
    </React.Fragment>
  )

  const testEl = (
    <foo>
      <TestComponent />
    </foo>
  )

  const res = unrollElement(testEl, resolveFn)

  t.deepEquals(res, [
    'foo',
    {},
    [['bar', {}, '2'], ['baz', {}, '3'], ['quux', {}, '23']]
  ])

  t.end()
})
