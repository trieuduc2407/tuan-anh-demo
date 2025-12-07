import React, { useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import MapMarkers from '../components/MapMarkers'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import useMapImage from '../hooks/useMapImage'
import mapsData from '../data'
import useZoom from '../hooks/useZoom'
import usePan from '../hooks/usePan'
import ZoomControls from '../components/ZoomControls'
import { convertMarkersToPixels, mapImageUrl } from '../utils/mapUtils'
import MarkerModal from '../components/MarkerModal'
import MapContainer from '../components/MapContainer'
import useScrollRestoration from '../hooks/useScrollRestoration'

const SubMap = () => {
    const navigate = useNavigate()
    const { countryId } = useParams()
    const location = useLocation()

    const imgRef = useRef(null)
    const containerRef = useRef(null)
    const [imgVisible, setImgVisible] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { naturalWidth, naturalHeight, baseWidth, handleImgLoad } =
        useMapImage({ imgRef, scale: 1 })

    const { scale, zoomIn, zoomOut } = useZoom({
        containerRef,
        imgRef,
        baseWidth,
        initialScale: 1,
    })

    const displayWidthPx = baseWidth ? baseWidth * scale : null
    const displayHeightPx =
        naturalWidth && naturalHeight && displayWidthPx
            ? (naturalHeight / naturalWidth) * displayWidthPx
            : null

    const panHandlers = usePan(containerRef)
    const { isPanning } = panHandlers

    useScrollRestoration(containerRef, location?.state?.scroll, imgVisible)

    return (
        <MapContainer
            containerRef={containerRef}
            isPanning={isPanning}
            panHandlers={panHandlers}
        >
            <button
                className="fixed top-5 bg-gray-300/50 rounded-full left-5 z-50"
                onClick={() => navigate('/')}
            >
                <ChevronLeft className="h-10 w-10 text-white" />
            </button>
            <div className="relative ">
                <img
                    ref={imgRef}
                    src={mapImageUrl(countryId, mapsData)}
                    alt="Country map"
                    onLoad={() => {
                        handleImgLoad()
                        setImgVisible(true)
                    }}
                    style={{
                        '--img-w': displayWidthPx
                            ? `${displayWidthPx}px`
                            : 'auto',
                        '--img-h': displayHeightPx
                            ? `${displayHeightPx}px`
                            : 'auto',
                    }}
                    className={`block h-[var(--img-h)] w-[var(--img-w)] max-w-none transition-opacity duration-200 ${imgVisible ? 'opacity-100' : 'opacity-0'}`}
                />

                {naturalWidth > 0 &&
                    (() => {
                        const sourceMarkers =
                            location?.state?.markers ||
                            mapsData[countryId]?.markers ||
                            []
                        const markers = convertMarkersToPixels(
                            sourceMarkers,
                            naturalWidth,
                            naturalHeight
                        )

                        return (
                            <MapMarkers
                                markers={markers}
                                naturalWidth={naturalWidth}
                                naturalHeight={naturalHeight}
                                displayWidthPx={displayWidthPx}
                                displayHeightPx={displayHeightPx}
                                onMarkerClick={(marker) => {
                                    setSelectedMarker(marker)
                                    setIsModalOpen(true)
                                }}
                                containerRef={containerRef}
                            />
                        )
                    })()}

                <ZoomControls
                    scale={scale}
                    onZoomIn={zoomIn}
                    onZoomOut={zoomOut}
                />
            </div>

            <MarkerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                marker={selectedMarker}
            />
        </MapContainer>
    )
}

export default SubMap
