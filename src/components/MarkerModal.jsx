import React, { useEffect, useRef } from 'react'
import button from '../assets/images/button.png'

const MarkerModal = ({ isOpen, onClose, marker }) => {
    const audioRef = useRef(null)

    useEffect(() => {
        if (isOpen && audioRef.current) {
            audioRef.current.volume = 0.5
            audioRef.current.play().catch((error) => {
                console.log('Autoplay prevented:', error)
            })
        }
    }, [isOpen])

    if (!marker) return null

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={onClose}
                    ></div>
                    <div className="relative z-10 flex">
                        <img
                            src="https://res.cloudinary.com/dmoegyeh9/image/upload/v1764692543/modal_jjafwy.png"
                            alt=""
                            className="h-auto w-full justify-self-center"
                        />

                        <p className="absolute top-[15%] left-1/2 -translate-x-1/2 transform text-sm font-bold lg:text-lg 2xl:text-xl">
                            {marker.label}
                        </p>
                        <div className="absolute top-[18%] left-[42%] h-[16%] w-[16%]">
                            {marker.image && (
                                <img
                                    src={marker.image}
                                    alt={marker.label}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                        <audio
                            ref={audioRef}
                            src={marker.audio}
                            controls
                            controlsList="nodownload noplaybackrate"
                            className="absolute bottom-[65%] left-[42%] w-[16%]"
                        />
                        <div className="show-scrollbar absolute top-[35%] left-[50.5%] h-[11.5%] w-[17%] -translate-x-1/2 transform overflow-x-hidden overflow-y-auto">
                            <p className="text-sm font-semibold">
                                {marker.description}
                            </p>
                        </div>
                        <div className="absolute top-[46.5%] left-[56.5%]">
                            <img
                                className="relative h-auto w-15"
                                src={button}
                                alt=""
                            />
                            <button
                                className="absolute top-1.5 left-[51%] -translate-x-1/2 transform text-sm text-gray-600"
                                onClick={onClose}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MarkerModal
