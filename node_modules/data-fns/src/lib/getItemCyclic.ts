export const getItemCyclic = <T>(index: number, array: Array<T>): T => {
  const id = index % array.length
  return array[id]
}
