export const times = <T>(iterations: number, callback: (index: number) => T): Array<T> => {
  let result: Array<T> = []
  
  for (let i=0; i < iterations; i++) {
      result.push(callback(i));
  }
  
  return result
}