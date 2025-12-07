import { useEffect } from 'react'

/**
 * Hook để restore scroll position từ navigation state
 * @param {Object} containerRef - Ref của scroll container
 * @param {Object} scrollState - Scroll state từ location.state
 * @param {boolean} ready - Trigger khi ready để restore (ví dụ: sau khi image load)
 */
export default function useScrollRestoration(containerRef, scrollState, ready) {
    useEffect(() => {
        if (!ready || !scrollState || !containerRef?.current) return

        requestAnimationFrame(() => {
            try {
                if (containerRef.current) {
                    containerRef.current.scrollLeft = scrollState.left || 0
                    containerRef.current.scrollTop = scrollState.top || 0
                }
            } catch (e) {
                console.error('Failed to restore scroll position:', e)
            }
        })
    }, [containerRef, scrollState, ready])
}
