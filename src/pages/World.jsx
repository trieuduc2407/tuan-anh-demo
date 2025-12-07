import React, { useRef, useState, useEffect } from 'react'
import MapMarkers from '../components/MapMarkers'
import mapsData from '../data'
import ZoomControls from '../components/ZoomControls'
import useZoom from '../hooks/useZoom'
import useMapImage from '../hooks/useMapImage'
import usePan from '../hooks/usePan'
import { useNavigate } from 'react-router-dom'
import { preloadImage, buildWorldMarkers, mapImageUrl } from '../utils/mapUtils'
import { useMarkerContext } from '../context/markerStore'
import useProgressTracking from '../hooks/useProgressTracking'
import MapContainer from '../components/MapContainer'
import VictoryModal from '../components/VictoryModal'
import MarkerModal from '../components/MarkerModal'
import { Info, Trophy } from 'lucide-react'
import StartupModal from '../components/StartupModal'
import NameModal from '../components/NameModal'

const World = () => {
    const navigate = useNavigate()
    const { revealed } = useMarkerContext()

    const imgRef = useRef(null)
    const containerRef = useRef(null)

    const [overlayVisible, setOverlayVisible] = useState(false)
    const [overlaySrc, setOverlaySrc] = useState(null)
    const [overlayDims, setOverlayDims] = useState({
        width: null,
        height: null,
    })
    const overlayImgRef = useRef(null)
    const navigateOnceRef = useRef(false)
    const pendingNavRef = useRef(null)
    const [showName, setShowName] = useState(() => {
        const hasEnteredName = localStorage.getItem('hasEnteredName')
        return !hasEnteredName
    })
    const [showStartup, setShowStartup] = useState(false)
    const [showVictory, setShowVictory] = useState(false)
    const [hasShownVictory, setHasShownVictory] = useState(false)
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [isMarkerModalOpen, setIsMarkerModalOpen] = useState(false)
    const [userData, setUserData] = useState(() => ({
        name: localStorage.getItem('userName') || '',
        userId: localStorage.getItem('userId') || '',
    }))

    const { naturalWidth, naturalHeight, baseWidth, handleImgLoad } =
        useMapImage({ imgRef, scale: 1 })

    const { scale, zoomIn, zoomOut } = useZoom({
        containerRef,
        imgRef,
        baseWidth,
        initialScale: 1,
    })

    const displayWidth = baseWidth ? baseWidth * scale : null
    const displayHeight =
        naturalWidth && naturalHeight && displayWidth
            ? (naturalHeight / naturalWidth) * displayWidth
            : null

    const panHandlers = usePan(containerRef)
    const { isPanning } = panHandlers

    const { totalMarkers, revealedCount, progressValue } = useProgressTracking(
        mapsData,
        revealed
    )

    if (
        totalMarkers > 0 &&
        revealedCount === totalMarkers &&
        !hasShownVictory &&
        !showVictory
    ) {
        const hasSeenVictory = localStorage.getItem('hasSeenVictory')
        if (!hasSeenVictory) {
            setHasShownVictory(true)
            setShowVictory(true)
        }
    }

    const handleMarkerClick = async (point) => {
        if (!point || !point.countryId) {
            navigate('/submap')
            return
        }

        if (point.type === 'marker') {
            setSelectedMarker(point)
            setIsMarkerModalOpen(true)
            return
        }

        const countryId = point.countryId
        const imgPath = mapImageUrl(countryId, mapsData)

        try {
            const loadedImg = await preloadImage(imgPath)

            const vw = window.innerWidth || document.documentElement.clientWidth
            const baseW = Math.min(loadedImg.naturalWidth || vw, vw)
            const dispW = baseW
            const dispH = loadedImg.naturalHeight
                ? (loadedImg.naturalHeight / loadedImg.naturalWidth) * dispW
                : null

            setOverlayDims({ width: dispW, height: dispH })
            setOverlaySrc(imgPath)

            const scrollState = containerRef.current
                ? {
                      left: containerRef.current.scrollLeft,
                      top: containerRef.current.scrollTop,
                  }
                : null

            requestAnimationFrame(() => {
                try {
                    document.body.style.overflow = 'hidden'
                } catch (e) {
                    void e
                }
                setOverlayVisible(true)
            })

            pendingNavRef.current = {
                scroll: scrollState,
                marker: point,
                countryId,
            }
        } catch (err) {
            void err
            navigate(`/submap/${point.countryId}`)
        }
    }

    useEffect(() => {
        if (!overlayVisible || !overlayImgRef.current) return

        navigateOnceRef.current = false

        const imgEl = overlayImgRef.current
        const onEnd = (e) => {
            if (e.propertyName !== 'opacity') return
            if (navigateOnceRef.current) return
            navigateOnceRef.current = true
            try {
                document.body.style.overflow = ''
            } catch (e) {
                void e
            }
            const pending = pendingNavRef.current
            if (pending && pending.countryId) {
                const url = `/submap/${pending.countryId}`
                navigate(url, { state: pending })
            } else {
                navigate('/submap')
            }
        }

        imgEl.addEventListener('transitionend', onEnd)
        const fallback = setTimeout(() => {
            if (!navigateOnceRef.current) {
                navigateOnceRef.current = true
                try {
                    document.body.style.overflow = ''
                } catch (e) {
                    void e
                }
                const pending = pendingNavRef.current
                if (pending && pending.countryId) {
                    navigate(`/submap/${pending.countryId}`, { state: pending })
                } else {
                    navigate('/submap')
                }
            }
        }, 800)

        return () => {
            imgEl.removeEventListener('transitionend', onEnd)
            clearTimeout(fallback)
        }
    }, [overlayVisible, navigate])

    const scrollDown = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollTop + 650,
                behavior: 'smooth',
            })
        }
    }

    const handleNameConfirm = () => {
        setShowName(false)
        setShowStartup(true)
    }

    const handleStartupClose = () => {
        localStorage.setItem('hasSeenStartup', 'true')
        setShowStartup(false)
    }

    const handleStartupStart = () => {
        localStorage.setItem('hasSeenStartup', 'true')
        setShowStartup(false)
        scrollDown()
    }

    const handleVictoryClose = () => {
        localStorage.setItem('hasSeenVictory', 'true')
        setShowVictory(false)
    }

    return (
        <MapContainer
            containerRef={containerRef}
            isPanning={isPanning}
            panHandlers={panHandlers}
        >
            <div className="relative block">
                <div className="absolute top-10 right-10 flex flex-col gap-5">
                    <button
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-black shadow hover:bg-gray-100"
                        onClick={() => {
                            setShowStartup(true)
                        }}
                    >
                        <Info />
                    </button>
                    <button
                        className={`${revealedCount === totalMarkers ? 'flex' : 'hidden'} h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-black shadow hover:bg-gray-100`}
                        onClick={() => {
                            setShowVictory(true)
                        }}
                    >
                        <Trophy />
                    </button>
                </div>
                <img
                    ref={imgRef}
                    src="https://res.cloudinary.com/dmoegyeh9/image/upload/v1764954848/final_back_zvkgnb.jpg"
                    alt="World map"
                    onLoad={handleImgLoad}
                    style={{
                        width: displayWidth ? `${displayWidth}px` : 'auto',
                    }}
                    className="block h-auto max-w-none"
                />

                {naturalWidth > 0 &&
                    (() => {
                        const worldMarkers = buildWorldMarkers(mapsData)

                        return (
                            <>
                                <MapMarkers
                                    markers={worldMarkers}
                                    naturalWidth={naturalWidth}
                                    naturalHeight={naturalHeight}
                                    displayWidthPx={displayWidth}
                                    displayHeightPx={displayHeight}
                                    onMarkerClick={handleMarkerClick}
                                    containerRef={containerRef}
                                />

                                <div
                                    className="absolute -translate-x-1/2 cursor-pointer"
                                    style={{
                                        bottom: `${100 * scale}px`,
                                        left: `${displayWidth ? displayWidth / 2 : 0}px`,
                                        width: `${displayWidth / 2}px`,
                                    }}
                                >
                                    <progress
                                        className="progress progress-success h-4 border-2 border-white"
                                        value={progressValue}
                                        max="100"
                                    ></progress>
                                    <p className="mt-2 text-center text-lg font-bold text-white">
                                        Đã tìm thấy {revealedCount} /{' '}
                                        {totalMarkers} địa điểm
                                    </p>
                                </div>
                            </>
                        )
                    })()}

                <div className="absolute bottom-17 left-12 flex flex-col gap-1 rounded bg-gray-100/50 p-2 shadow-lg">
                    <p>{userData ? `Tên: ${userData.name}` : ''}</p>
                    <p>{userData ? `ID: ${userData.userId}` : ''}</p>
                </div>
                <ZoomControls
                    scale={scale}
                    onZoomIn={zoomIn}
                    onZoomOut={zoomOut}
                />
            </div>

            {overlaySrc && (
                <div
                    aria-hidden
                    className="pointer-events-auto fixed inset-0 z-60 flex items-start justify-center overflow-auto bg-black/60 p-0"
                >
                    <div className="relative inline-block">
                        <img
                            ref={overlayImgRef}
                            src={overlaySrc}
                            alt="transition target"
                            style={{
                                '--overlay-w': overlayDims.width
                                    ? `${overlayDims.width}px`
                                    : 'auto',
                                '--overlay-h': overlayDims.height
                                    ? `${overlayDims.height}px`
                                    : 'auto',
                                transition:
                                    'opacity 400ms cubic-bezier(.22,.9,.35,1)',
                                opacity: overlayVisible ? 1 : 0,
                                willChange: 'opacity, transform',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden',
                                display: 'block',
                                margin: 0,
                            }}
                            className="m-0 block h-[var(--overlay-h)] w-[var(--overlay-w)]"
                        />
                    </div>
                </div>
            )}
            <NameModal isOpen={showName} onConfirm={handleNameConfirm} />
            <StartupModal
                isOpen={showStartup}
                onClose={handleStartupClose}
                onStart={handleStartupStart}
            />
            <VictoryModal
                isOpen={showVictory}
                onClose={handleVictoryClose}
                totalMarkers={totalMarkers}
            />
            <MarkerModal
                isOpen={isMarkerModalOpen}
                onClose={() => setIsMarkerModalOpen(false)}
                marker={selectedMarker}
            />
        </MapContainer>
    )
}

export default World
