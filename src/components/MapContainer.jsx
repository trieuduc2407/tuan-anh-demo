import React from 'react'

/**
 * Reusable container cho map với pan support
 */
const MapContainer = ({ containerRef, isPanning, panHandlers, children }) => {
    const {
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onMouseLeave,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    } = panHandlers

    return (
        <div
            ref={containerRef}
            className={`h-screen w-full overflow-auto ${
                isPanning ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {children}
        </div>
    )
}

export default MapContainer
