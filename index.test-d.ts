import { expectType } from 'tsd'
import { createElement } from 'react'

import unrollElement, { ResolverFn } from '.'

declare function SomeComponent(): null

type Result = [string, Result[]]

const resolverFn: ResolverFn<Result, null> = (el, children, index, context) => [
  el.type.toString(),
  children
]

expectType<Result>(
  unrollElement(createElement(SomeComponent), resolverFn, null)
)
