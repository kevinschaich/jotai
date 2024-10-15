import { createContext, createElement, useContext, useRef } from 'react'
import type { FunctionComponentElement, ReactNode } from 'react'
import { createStore, getDefaultStore } from '../vanilla.ts'

type Store = ReturnType<typeof createStore>

type StoreContextType = ReturnType<typeof createContext<Store | undefined>>
const StoreContext: StoreContextType = createContext<Store | undefined>(
  undefined,
)

type Options = {
  store?: Store
}

export const useStore = (options?: Options): Store => {
  const store = useContext(StoreContext)
  return options?.store || store || getDefaultStore()
}

/* eslint-disable react-compiler/react-compiler */
// TODO should we consider using useState instead of useRef?
export const Provider = ({
  children,
  store,
}: {
  children?: ReactNode
  store?: Store
}): FunctionComponentElement<{ value: Store | undefined }> => {
  const storeRef = useRef<Store>()
  if (!store && !storeRef.current) {
    storeRef.current = createStore()
  }
  return createElement(
    StoreContext.Provider,
    {
      value: store || storeRef.current,
    },
    children,
  )
}
