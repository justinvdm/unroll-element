import { ReactElement } from 'react'

type ResolverFn<Result, Context> = (
  element: ReactElement,
  children: Result[],
  index: number,
  context: Context
) => Result

export default function unrollElement<Result, Context>(
  element: ReactElement,
  resolverFn: ResolverFn<Result, Context>,
  context: Context
): Result
