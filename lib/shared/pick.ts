type Many<T> = T | readonly T[]
export function pick<T extends object, K extends keyof T>(
  object: T,
  keys: Many<K>,
): Pick<T, K> {
  const picked: any = {}
  const newKeys = Array.isArray(keys) ? keys : [keys]
  for (const key of keys as K[]) {
    if (key in object) {
      picked[key] = object[key]
    }
  }
  return picked
}
