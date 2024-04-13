export { default as logger } from './logger'
export * from './pick'

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn()
}
