import { useRef, useState, useCallback } from 'react'

export default function usePan(containerRef) {
    const isPanningRef = useRef(false)
    const startXRef = useRef(0)
    const startYRef = useRef(0)
    const scrollLeftRef = useRef(0)
    const scrollTopRef = useRef(0)
    const [isPanning, setIsPanning] = useState(false)

    const onMouseDown = useCallback(
        (e) => {
            if (!containerRef?.current) return
            if (e.target && e.target.closest && e.target.closest('button'))
                return
            isPanningRef.current = true
            setIsPanning(true)
            startXRef.current = e.clientX
            startYRef.current = e.clientY
            scrollLeftRef.current = containerRef.current.scrollLeft
            scrollTopRef.current = containerRef.current.scrollTop
            e.preventDefault()
        },
        [containerRef]
    )

    const onMouseMove = useCallback(
        (e) => {
            if (!isPanningRef.current || !containerRef?.current) return
            const dx = e.clientX - startXRef.current
            const dy = e.clientY - startYRef.current
            containerRef.current.scrollLeft = scrollLeftRef.current - dx
            containerRef.current.scrollTop = scrollTopRef.current - dy
        },
        [containerRef]
    )

    const stopPan = useCallback(() => {
        isPanningRef.current = false
        setIsPanning(false)
    }, [])

    const onTouchStart = useCallback(
        (e) => {
            if (!containerRef?.current) return
            if (e.target && e.target.closest && e.target.closest('button'))
                return
            const t = e.touches[0]
            isPanningRef.current = true
            setIsPanning(true)
            startXRef.current = t.clientX
            startYRef.current = t.clientY
            scrollLeftRef.current = containerRef.current.scrollLeft
            scrollTopRef.current = containerRef.current.scrollTop
        },
        [containerRef]
    )

    const onTouchMove = useCallback(
        (e) => {
            if (!isPanningRef.current || !containerRef?.current) return
            const t = e.touches[0]
            const dx = t.clientX - startXRef.current
            const dy = t.clientY - startYRef.current
            containerRef.current.scrollLeft = scrollLeftRef.current - dx
            containerRef.current.scrollTop = scrollTopRef.current - dy
            e.preventDefault()
        },
        [containerRef]
    )

    const onTouchEnd = useCallback(() => {
        stopPan()
    }, [stopPan])

    return {
        isPanning,
        onMouseDown,
        onMouseMove,
        onMouseUp: stopPan,
        onMouseLeave: stopPan,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    }
}
