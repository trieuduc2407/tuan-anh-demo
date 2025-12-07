import { useMemo } from 'react'

/**
 * Hook để tính toán progress tracking của markers
 * @param {Object} mapsData - Dữ liệu maps từ maps.js
 * @param {Array} revealed - Array các marker IDs đã reveal
 * @returns {Object} { totalMarkers, revealedCount, progressValue }
 */
export default function useProgressTracking(mapsData, revealed) {
    return useMemo(() => {
        const totalMarkers = Object.values(mapsData).reduce(
            (sum, map) => sum + (map.markers?.length || 0),
            0
        )

        const anchorIds = Object.values(mapsData).map((map) => map.id)

        const revealedCount = revealed.filter(
            (id) => !anchorIds.includes(id)
        ).length

        const progressValue =
            totalMarkers > 0 ? (revealedCount / totalMarkers) * 100 : 0

        return { totalMarkers, revealedCount, progressValue }
    }, [mapsData, revealed])
}
