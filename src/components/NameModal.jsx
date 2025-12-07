import React, { useState, useRef } from 'react'

const defaultName = [
    'Thú mỏ vịt ẩn danh',
    'Lạc đà Alpaca ẩn danh',
    'Kỳ nhông Axolotl ẩn danh',
    'Kỳ lân biển ẩn danh',
    'Gấu nước ẩn danh',
    'Chuột túi Quokka ẩn danh',
    'Tê tê ẩn danh',
    'Vượn cáo ẩn danh',
    'Bò biển ẩn danh',
    'Quái vật Kraken ẩn danh',
]

const NameModal = ({ isOpen, onConfirm }) => {
    const [name, setName] = useState('')
    const [randomName, setRandomName] = useState({
        isShow: false,
        name: '',
    })
    const inputRef = useRef(null)

    if (!isOpen) return null

    const generateUserId = () => {
        const timestamp = Date.now()
        const random = Math.floor(Math.random() * 10000)
        return `${timestamp}-${random}`
    }

    const handleRandomName = () => {
        const randomNameSelected =
            defaultName[Math.floor(Math.random() * defaultName.length)]
        setName(randomNameSelected)

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
                const length = inputRef.current.value.length
                inputRef.current.setSelectionRange(length, length)
            }
        }, 0)
    }

    const handleConfirm = () => {
        if (!name.trim()) {
            setRandomName({ ...randomName, isShow: true })
            return
        }

        const userId = generateUserId()

        localStorage.setItem('userName', name.trim())
        localStorage.setItem('userId', userId)
        localStorage.setItem('hasEnteredName', 'true')

        if (onConfirm) {
            onConfirm({ name: name.trim(), userId })
        }
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-white">
                <p className="mb-4 text-center text-3xl font-bold">
                    Chào mừng!
                </p>
                <p className="mb-4 text-center">
                    Vui lòng nhập tên của bạn để bắt đầu
                </p>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className="input input-bordered w-full border-1 border-black bg-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleConfirm()
                        }
                    }}
                    autoFocus
                />
                <div className="modal-action justify-center">
                    <button
                        className="btn btn-info text-white"
                        onClick={handleRandomName}
                    >
                        Chọn ngẫu nhiên
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="btn btn-success text-white"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
            <div className="modal-backdrop"></div>
        </div>
    )
}

export default NameModal
