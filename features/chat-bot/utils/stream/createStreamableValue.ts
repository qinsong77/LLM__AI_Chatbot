import {
  DEV_DEFAULT_STREAMABLE_WARNING_TIME,
  STREAMABLE_VALUE_TYPE,
} from './constants'
import { StreamablePatch, StreamableValue } from './type'
import { createResolvablePromise } from './utils'

export function createStreamableValue<T = any, E = any>(initialValue?: T) {
  let closed = false
  let resolvable = createResolvablePromise<StreamableValue<T, E>>()

  let currentValue = initialValue
  let currentError: E | undefined
  let currentPromise: typeof resolvable.promise | undefined = resolvable.promise
  let currentPatchValue: StreamablePatch

  function assertStream(method: string) {
    if (closed) {
      throw new Error(method + ': Value stream is already closed.')
    }
  }

  let warningTimeout: NodeJS.Timeout | undefined
  function warnUnclosedStream() {
    if (process.env.NODE_ENV === 'development') {
      if (warningTimeout) {
        clearTimeout(warningTimeout)
      }
      warningTimeout = setTimeout(() => {
        console.warn(
          'The streamable UI has been slow to update. This may be a bug or a performance issue or you forgot to call `.done()`.',
        )
      }, DEV_DEFAULT_STREAMABLE_WARNING_TIME)
    }
  }
  warnUnclosedStream()

  function createWrapped(initialChunk?: boolean): StreamableValue<T, E> {
    // This makes the payload much smaller if there're mutative updates before the first read.
    let init: Partial<StreamableValue<T, E>>

    if (currentError !== undefined) {
      init = { error: currentError }
    } else {
      if (currentPatchValue && !initialChunk) {
        init = { diff: currentPatchValue }
      } else {
        init = { curr: currentValue }
      }
    }

    if (currentPromise) {
      init.next = currentPromise
    }

    if (initialChunk) {
      init.type = STREAMABLE_VALUE_TYPE
    }

    return init
  }

  // Update the internal `currentValue` and `currentPatchValue` if needed.
  function updateValueStates(value: T) {
    // If we can only send a patch over the wire, it's better to do so.
    currentPatchValue = undefined
    if (typeof value === 'string') {
      if (typeof currentValue === 'string') {
        if (value.startsWith(currentValue)) {
          currentPatchValue = [0, value.slice(currentValue.length)]
        }
      }
    }

    currentValue = value
  }

  return {
    /**
     * The value of the streamable. This can be returned from a Server Action and
     * received by the client. To read the streamed values, use the
     * `readStreamableValue` or `useStreamableValue` APIs.
     */
    get value() {
      return createWrapped(true)
    },
    /**
     * This method updates the current value with a new one.
     */
    update(value: T) {
      assertStream('.update()')

      const resolvePrevious = resolvable.resolve
      resolvable = createResolvablePromise()

      updateValueStates(value)
      currentPromise = resolvable.promise
      resolvePrevious(createWrapped())

      warnUnclosedStream()
    },
    error(error: any) {
      assertStream('.error()')

      if (warningTimeout) {
        clearTimeout(warningTimeout)
      }
      closed = true
      currentError = error
      currentPromise = undefined

      resolvable.resolve({ error })
    },
    done(...args: [] | [T]) {
      assertStream('.done()')

      if (warningTimeout) {
        clearTimeout(warningTimeout)
      }
      closed = true
      currentPromise = undefined

      if (args.length) {
        updateValueStates(args[0])
        resolvable.resolve(createWrapped())
        return
      }

      resolvable.resolve({})
    },
  }
}
