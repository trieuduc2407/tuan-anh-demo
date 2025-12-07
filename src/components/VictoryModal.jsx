import React, { useState } from 'react'

const VictoryModal = ({ isOpen, onClose }) => {
    const [isClicked, setIsClicked] = useState(false)
    const userName = localStorage.getItem('userName')
    const userId = localStorage.getItem('userId')

    if (!isOpen) return null

    return (
        <div className="modal modal-open">
            <div
                className="modal-box bg-transparent shadow-none"
                style={{ width: '50%', maxWidth: '90vw' }}
            >
                {!isClicked ? (
                    <img
                        className="w-full animate-pulse"
                        src="https://res.cloudinary.com/dmoegyeh9/image/upload/v1765093156/pop_up_congratulation1_pxk3ix.png"
                        alt=""
                        onClick={() => setIsClicked(true)}
                    />
                ) : (
                    <>
                        <img
                            className="relative w-full"
                            src="https://res.cloudinary.com/dmoegyeh9/image/upload/v1765093156/pop_up_congratulaystion_2_ny1bqt.png"
                            alt=""
                        />
                        <p
                            className="absolute text-lg top-[38.5%] left-[40%]"
                            style={{ fontFamily: "'iCielBC Lodestone', sans-serif" }}
                        >
                            {userName} #{userId.slice(-4)}
                        </p>
                    </>
                )}
            </div>
            <div
                className="modal-backdrop"
                onClick={() => {
                    onClose()
                    setIsClicked(false)
                }}
            ></div>
        </div>
    )
}

export default VictoryModal
