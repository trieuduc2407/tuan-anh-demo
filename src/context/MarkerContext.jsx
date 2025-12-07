import React, { useCallback, useEffect, useState } from 'react'
import MarkerContext from './markerStore'

const STORAGE_KEY = 'app:revealedMarkers:v1'

const MarkerProvider = ({ children }) => {
    const [revealed, setRevealed] = useState(() => {
        try {
            if (typeof window === 'undefined') return []
            const raw = window.localStorage.getItem(STORAGE_KEY)
            return raw ? JSON.parse(raw) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(revealed))
        } catch {
            // ignore errors
        }
    }, [revealed])

    const reveal = useCallback((id) => {
        if (id == null) return
        setRevealed((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }, [])

    const hide = useCallback((id) => {
        if (id == null) return
        setRevealed((prev) => prev.filter((x) => x !== id))
    }, [])

    const reset = useCallback(() => setRevealed([]), [])

    return (
        <MarkerContext.Provider value={{ revealed, reveal, hide, reset }}>
            {children}
        </MarkerContext.Provider>
    )
}

export default MarkerProvider
