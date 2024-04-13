/**
 * example
 * import { Provider } from './store'
 *
 * function App() {
 *   return (
 *     <>
 *       <Provider>
 *         <Theme />
 *       </Provider>
 *       <Provider>
 *         <Theme />
 *       </Provider>
 *     </>
 *   )
 * }
 *
 * import { useStore } from './store';
 * import { useSelector } from './use-selector';
 *
 * const Theme = () => {
 *
 *   const { theme, setTheme } = useStore(useSelector(['theme', 'setTheme']));
 *
 *   return (
 *     <div>
 *       <div>{theme}</div>
 *       <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换</button>
 *     </div>
 *   )
 * }
 *
 * export default Theme;
 */
import React, { useContext, useRef } from 'react'
import {
  createStore,
  StateCreator,
  StoreApi,
  useStore as useExternalStore,
} from 'zustand'

type ExtractState<S> = S extends { getState: () => infer X } ? X : never

export const createContext = <T>(store: StateCreator<T, [], []>) => {
  const Context = React.createContext<StoreApi<T>>({} as StoreApi<T>)

  const Provider = ({ children }: any) => {
    const storeRef = useRef<StoreApi<T> | undefined>()
    if (!storeRef.current) {
      storeRef.current = createStore<T>(store)
    }
    return React.createElement(
      Context.Provider,
      { value: storeRef.current },
      children,
    )
  }

  function useStore(): T
  function useStore<U>(selector: (state: ExtractState<StoreApi<T>>) => U): U
  function useStore<U>(selector?: (state: ExtractState<StoreApi<T>>) => U): U {
    const store = useContext(Context)
    // @ts-ignore
    return useExternalStore(store, selector)
  }

  return { Provider, Context, useStore }
}
