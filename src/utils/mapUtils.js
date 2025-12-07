export function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        if (img.complete) return resolve(img)
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error('failed to load'))
    })
}

export function mapImageUrl(countryId, mapsData) {
    if (!countryId || !mapsData) return '/maps/default.jpg'
    const country = mapsData[countryId]
    return country?.images
}

export function buildWorldMarkers(mapsData) {
    if (!mapsData) return []
    
    const points = []
    
    Object.values(mapsData).forEach((country) => {
        // Detect if country has SubMap by checking marker ID patterns
        // Type A: markers start with 'pr' (province/place)
        // Type B: markers start with 'co' (country)
        const hasSubMap = country.markers?.some(m => m.id?.startsWith('pr'))
        
        if (hasSubMap) {
            // Type A: Create anchor point for navigation to SubMap
            points.push({
                type: 'anchor',
                id: country.id,
                countryId: country.id,
                x: country.anchor?.x || 0,
                y: country.anchor?.y || 0,
                label: country.label,
            })
        } else {
            // Type B: Use the single marker directly
            const marker = country.markers?.[0]
            if (marker) {
                points.push({
                    type: 'marker',
                    id: marker.id,
                    countryId: country.id,
                    x: marker.x,
                    y: marker.y,
                    label: marker.label,
                    // Include data for modal display
                    description: marker.description,
                    audio: marker.audio,
                    image: marker.image,
                })
            }
        }
    })
    
    return points
}

export function convertMarkersToPixels(
    markers = [],
    naturalWidth = 0,
    naturalHeight = 0
) {
    if (!Array.isArray(markers)) return []
    return markers.map((m) => {
        if (m == null) return m
        if (m.x != null && m.y != null) return m
        if (m.xPct != null && naturalWidth) {
            return {
                ...m,
                x: Math.round(naturalWidth * m.xPct),
                y: Math.round(naturalHeight * (m.yPct || 0)),
            }
        }
        return m
    })
}
