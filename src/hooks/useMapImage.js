import { useEffect, useState } from 'react'

export default function useMapImage({ imgRef, scale = 1 } = {}) {
    const [naturalWidth, setNaturalWidth] = useState(0)
    const [naturalHeight, setNaturalHeight] = useState(0)
    const [baseWidth, setBaseWidth] = useState(0)

    const handleImgLoad = () => {
        if (imgRef?.current) {
            const nat = imgRef.current.naturalWidth
            const nh = imgRef.current.naturalHeight
            const vw = window.innerWidth || document.documentElement.clientWidth
            const calculated = Math.max(nat, vw)
            setNaturalWidth(nat)
            setNaturalHeight(nh)
            setBaseWidth(calculated)
        }
    }

    useEffect(() => {
        const onResize = () => {
            if (!imgRef?.current) return
            const nat = imgRef.current.naturalWidth || naturalWidth
            const vw = window.innerWidth || document.documentElement.clientWidth
            const calculated = Math.max(nat || 0, vw)
            setBaseWidth(calculated)
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [imgRef, naturalWidth])

    const displayWidthPx = baseWidth ? baseWidth * scale : null
    const displayHeightPx =
        naturalWidth && naturalHeight && displayWidthPx
            ? (naturalHeight / naturalWidth) * displayWidthPx
            : null

    return {
        naturalWidth,
        naturalHeight,
        baseWidth,
        displayWidthPx,
        displayHeightPx,
        handleImgLoad,
        setBaseWidth,
        setNaturalWidth,
        setNaturalHeight,
    }
}
