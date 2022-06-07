export const replaceAt = <A>(
  array: Array<A>,
  index: number,
  replacementFn: (item: A) => A
): Array<A> => {
  const item = array[index]

  return array
    .slice(0, index)
    .concat([replacementFn(item)])
    .concat(array.slice(index + 1))
}
