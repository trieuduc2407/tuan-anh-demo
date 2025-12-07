/**
 * Build country data with auto-imported assets
 * @param {string} countryFolder - Folder name in assets (e.g., 'France', 'USA')
 * @param {Object} config - Country configuration
 * @param {string} config.id - Country ID
 * @param {string} config.label - Country label
 * @param {Object} config.anchor - Anchor coordinates on world map
 * @param {Array} config.markerConfigs - Array of marker configs (id, x, y, label)
 * @param {string} config.images - Country map image URL
 * @returns {Object} Complete country data object
 */
export function buildCountryData(countryFolder, config) {
    const { id, label, anchor, markerConfigs, images } = config

    // Auto-import all assets for this country
    const descriptions = import.meta.glob('../assets/descriptions/**/*.txt', {
        query: '?raw',
        import: 'default',
        eager: true,
    })
    const sounds = import.meta.glob('../assets/sounds/**/*.mp3', {
        import: 'default',
        eager: true,
    })
    const imageFiles = import.meta.glob('../assets/images/modal/**/*.jpg', {
        import: 'default',
        eager: true,
    })

    // Merge manual config with auto-imported assets
    const markers = markerConfigs.map((marker) => ({
        ...marker,
        description:
            descriptions[
                `../assets/descriptions/${countryFolder}/${marker.id}.txt`
            ],
        audio: sounds[`../assets/sounds/${countryFolder}/${marker.id}.mp3`],
        image: imageFiles[
            `../assets/images/modal/${countryFolder}/${marker.id}.jpg`
        ],
    }))

    return {
        id,
        label,
        anchor,
        markers,
        images,
    }
}
