import { getItemCyclic } from './getItemCyclic'

export const patternChunks = <T>(array: Array<T>, pattern: Array<number>): Array<Array<T>> => {
  const result: Array<Array<T>> = []
  const _array = [...array]
  let i = 0

  while (_array.length > 0) {
    result.push(_array.splice(0, getItemCyclic(i, pattern)))
    i++
  }

  return result
}
