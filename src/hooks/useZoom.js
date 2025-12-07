import { useState, useEffect } from 'react'

function useZoom({ containerRef, imgRef, baseWidth, initialScale = 1 } = {}) {
    const [scale, setScale] = useState(initialScale)

    const computeAndApplyScrollForScale = (targetScale) => {
        const container = containerRef?.current
        const img = imgRef?.current
        if (!container || !img) {
            setScale(targetScale)
            return
        }

        const containerRect = container.getBoundingClientRect()
        const imageRect = img.getBoundingClientRect()

        const clientCenterX = containerRect.left + container.clientWidth / 2
        const clientCenterY = containerRect.top + container.clientHeight / 2

        const pointX = clientCenterX - imageRect.left
        const pointY = clientCenterY - imageRect.top

        const currentImageWidth =
            imageRect.width || img.offsetWidth || img.clientWidth
        const currentImageHeight =
            imageRect.height || img.offsetHeight || img.clientHeight

        const ratioX = currentImageWidth ? pointX / currentImageWidth : 0.5
        const ratioY = currentImageHeight ? pointY / currentImageHeight : 0.5

        const targetWidth = baseWidth
            ? baseWidth * targetScale
            : currentImageWidth * targetScale
        const targetHeight =
            (currentImageHeight / currentImageWidth) * targetWidth ||
            currentImageHeight * targetScale

        const newPointX = ratioX * targetWidth
        const newPointY = ratioY * targetHeight

        const deltaX = newPointX - pointX
        const deltaY = newPointY - pointY

        const newScrollLeft = Math.max(0, container.scrollLeft + deltaX)
        const newScrollTop = Math.max(0, container.scrollTop + deltaY)

        setScale(targetScale)
        requestAnimationFrame(() => {
            container.scrollLeft = newScrollLeft
            container.scrollTop = newScrollTop
        })
    }

    // Calculate the scale needed to fit image to screen
    const calculateFitScale = () => {
        const container = containerRef?.current
        if (!container || !baseWidth) return 0.5
        
        const viewportWidth = container.clientWidth || window.innerWidth
        const fitScale = viewportWidth / baseWidth
        
        // Min scale is either 0.5 or whatever needed to fit
        return Math.min(fitScale, 1)
    }

    // Set initial scale to fit-to-screen when baseWidth is available
    useEffect(() => {
        if (baseWidth && scale === initialScale) {
            const fitScale = calculateFitScale()
            setScale(fitScale)
        }
    }, [baseWidth])

    const zoomIn = () => {
        // Cycle: fit → 1x → 2x
        if (scale < 1) {
            computeAndApplyScrollForScale(1)
        } else {
            computeAndApplyScrollForScale(2)
        }
    }
    
    const zoomOut = () => {
        // Cycle: 2x → 1x → fit-to-screen
        if (scale > 1) {
            computeAndApplyScrollForScale(1)
        } else {
            const fitScale = calculateFitScale()
            computeAndApplyScrollForScale(fitScale)
        }
    }

    return { scale, setScale, zoomIn, zoomOut, computeAndApplyScrollForScale }
}

export default useZoom
