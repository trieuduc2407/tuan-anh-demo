import React from 'react'
import { ZoomIn, ZoomOut } from 'lucide-react'

const ZoomControls = ({ scale = 1, onZoomIn, onZoomOut }) => {
    return (
        <div className="fixed right-6 bottom-6 z-10 flex flex-col gap-2">
            <button
                className="flex h-12 w-12 items-center justify-center rounded border border-gray-300 bg-white text-black shadow hover:bg-gray-100"
                onClick={onZoomIn}
                aria-label="Zoom in"
                type="button"
            >
                <ZoomIn />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded border border-gray-300 bg-white text-black shadow select-none">
                {Math.round(scale * 100)}%
            </div>

            <button
                className="flex h-12 w-12 items-center justify-center rounded border border-gray-300 bg-white text-black shadow hover:bg-gray-100"
                onClick={onZoomOut}
                aria-label="Zoom out"
                type="button"
            >
                <ZoomOut />
            </button>
        </div>
    )
}

export default ZoomControls
