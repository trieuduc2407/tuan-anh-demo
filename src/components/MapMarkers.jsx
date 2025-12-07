import React, { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { useMarkerContext } from '../context/markerStore'

// Configurable reveal radius (square proximity)
const REVEAL_RADIUS = 100

const MapMarkers = ({
    markers = [],
    naturalWidth,
    naturalHeight,
    displayWidthPx,
    displayHeightPx,
    onMarkerClick,
    containerRef,
}) => {
    const { revealed: globalRevealed, reveal: revealGlobal } =
        useMarkerContext()
    const [revealedLocal, setRevealedLocal] = useState([])
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })

    // Make marker visible permanently (on hover)
    const makeVisible = (id) => {
        if (id == null) return
        setRevealedLocal((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }

    // Mark marker as completed (on click) - contributes to progress
    const markCompleted = (id) => {
        if (id == null) return
        revealGlobal(id)
    }

    // Track mouse position relative to map container
    useEffect(() => {
        if (!containerRef?.current) return

        const handleMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePos({
                x: e.clientX - rect.left + containerRef.current.scrollLeft,
                y: e.clientY - rect.top + containerRef.current.scrollTop,
            })
        }

        const container = containerRef.current
        container.addEventListener('mousemove', handleMouseMove)
        return () => container.removeEventListener('mousemove', handleMouseMove)
    }, [containerRef])

    if (!naturalWidth || !naturalHeight) return null

    return markers.map((m) => {
        const leftPx = displayWidthPx
            ? (m.x / naturalWidth) * displayWidthPx
            : 0
        const topPx = displayHeightPx
            ? (m.y / naturalHeight) * displayHeightPx
            : 0

        const isRevealed =
            m.id != null &&
            (revealedLocal.includes(m.id) || globalRevealed.includes(m.id))

        const isNearby =
            Math.abs(leftPx - mousePos.x) < REVEAL_RADIUS &&
            Math.abs(topPx - mousePos.y) < REVEAL_RADIUS

        if (!isRevealed && !isNearby) {
            return null
        }

        const style = {
            position: 'absolute',
            left: `${leftPx}px`,
            top: `${topPx}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 20,
        }

        const visibilityClass = isRevealed
            ? 'opacity-100'
            : 'opacity-0 hover:opacity-100 focus:opacity-100'

        return (
            <button
                key={m.id}
                style={style}
                className={`flex h-9 w-9 items-center justify-center rounded-full shadow-none transition-opacity duration-200 ${visibilityClass}`}
                onMouseEnter={() => makeVisible(m.id)}
                onFocus={() => makeVisible(m.id)}
                onClick={() => {
                    markCompleted(m.id)
                    onMarkerClick && onMarkerClick(m)
                }}
                aria-label={m.label}
                type="button"
            >
                <MapPin className="text-red-700 hover:h-15 hover:w-15 hover:text-lime-400" />
            </button>
        )
    })
}

export default MapMarkers
