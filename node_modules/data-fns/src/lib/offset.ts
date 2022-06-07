export const offset = <T extends Array<any>>(list: T, amount: number): T => {
  return [...list.slice(amount), ...list.slice(0, amount)] as T
}
