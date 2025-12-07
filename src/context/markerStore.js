import { createContext, useContext } from 'react'

export const MarkerContext = createContext(null)

export const useMarkerContext = () => {
    const ctx = useContext(MarkerContext)
    if (!ctx) {
        return {
            revealed: [],
            reveal: () => {},
            hide: () => {},
            reset: () => {},
        }
    }
    return ctx
}

export default MarkerContext
