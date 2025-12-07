import { Download } from 'lucide-react'
import React, { useState } from 'react'

const VictoryModal = ({ isOpen, onClose }) => {
    const [isClicked, setIsClicked] = useState(false)
    const userName = localStorage.getItem('userName')
    const userId = localStorage.getItem('userId')

    const downloadImage1 = async () => {
        const imageUrl = 'https://res.cloudinary.com/dmoegyeh9/image/upload/v1765093156/pop_up_congratulation1_pxk3ix.png'
        try {
            const response = await fetch(imageUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'certificate.png'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading image 1:', error)
        }
    }

    const downloadImage2WithText = async () => {
        const imageUrl = 'https://res.cloudinary.com/dmoegyeh9/image/upload/v1765093156/pop_up_congratulaystion_2_ny1bqt.png'
        try {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                
                canvas.width = img.width
                canvas.height = img.height
                
                ctx.drawImage(img, 0, 0)
                
                ctx.font = '18px "iCielBC Lodestone", sans-serif'
                ctx.fillStyle = '#000000' 
                ctx.textAlign = 'left'
                const x = canvas.width * 0.40
                const y = canvas.height * 0.385
                
                const text = `${userName} #${userId.slice(-4)}`
                ctx.fillText(text, x, y)
                
                canvas.toBlob((blob) => {
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `certificate-${userName}.png`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    window.URL.revokeObjectURL(url)
                }, 'image/png')
            }
            
            img.src = imageUrl
        } catch (error) {
            console.error('Error downloading image 2:', error)
        }
    }

    const handleDownloadAll = async () => {
        await downloadImage1()
        setTimeout(async () => {
            await downloadImage2WithText()
        }, 500)
    }

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
                            className="absolute top-[38.5%] left-[40%] text-lg"
                            style={{
                                fontFamily: "'iCielBC Lodestone', sans-serif",
                            }}
                        >
                            {userName} #{userId.slice(-4)}
                        </p>
                        <div className="absolute bottom-10 left-1/2 mt-5 flex -translate-x-1/2 transform gap-5 text-white">
                            <p className="p-2.5 text-2xl text-white">
                                Bấm vào đây để tải
                            </p>
                            <button 
                                className="animate-bounce cursor-pointer"
                                onClick={handleDownloadAll}
                            >
                                <Download />
                            </button>
                        </div>
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
