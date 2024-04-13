import { STREAMABLE_VALUE_TYPE } from './constants'

export type StreamablePatch = undefined | [0, string] // Append string.

/**
 * StreamableValue is a value that can be streamed over the network via AI Actions.
 * To read the streamed values, use the `readStreamableValue` or `useStreamableValue` APIs.
 */
export type StreamableValue<T = any, E = any> = {
  /**
   * @internal Use `readStreamableValue` to read the values.
   */
  type?: typeof STREAMABLE_VALUE_TYPE
  /**
   * @internal Use `readStreamableValue` to read the values.
   */
  curr?: T
  /**
   * @internal Use `readStreamableValue` to read the values.
   */
  error?: E
  /**
   * @internal Use `readStreamableValue` to read the values.
   */
  diff?: StreamablePatch
  /**
   * @internal Use `readStreamableValue` to read the values.
   */
  next?: Promise<StreamableValue<T, E>>
}
