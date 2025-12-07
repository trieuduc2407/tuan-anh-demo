import React from 'react'

const StartupModal = ({ isOpen, onClose, onStart }) => {
    if (!isOpen) return null

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-white">
                <p className="mb-4 text-center text-3xl font-bold">Cách chơi</p>
                <p className="mx-2.5">
                    - Nút mũi trên góc trên cùng bên trái để trở về màn hình
                    chính
                    <br />
                    - Bấm vào hình kính lúp để thay đổi độ phóng to bản đồ
                    <br />
                    - Di chuyển chuột xung quanh để tìm địa điểm
                    <br />
                    - Bấm giữ chuột và kéo để di chuyển bản đồ
                    <br />
                    - Bấm vào Landmark để tìm hiểu thêm thông tin và ghi nhận đã
                    tìm thấy địa điểm đó
                    <br />
                    <span className="font-semibold">- LƯU Ý: </span>
                    Hãy sử dụng trang web ở độ thu phóng 100%, chỉ sử dụng kính
                    lúp để phóng to bản đồ khi cần thiết
                    <br />
                    <span className="font-semibold">- LƯU Ý: </span>
                    Địa điểm chỉ xuất hiện khi bạn di chuột qua đúng vị trí, hãy
                    kiên nhẫn
                </p>
                <div className="modal-action justify-center">
                    <button
                        onClick={() => {
                            onClose()
                            onStart()
                        }}
                        className="btn btn-info text-white"
                    >
                        Bắt đầu thôi
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    )
}

export default StartupModal
