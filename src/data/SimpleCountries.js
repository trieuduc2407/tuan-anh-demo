/**
 * Simple countries without SubMap (Type B)
 * These countries have only 1 marker each and show modal directly
 * ID pattern: co19xx_xx
 */

// Auto-import assets for all countries
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

/**
 * Helper function to create a simple country object
 */
function createSimpleCountry(countryFolder, { id, label, x, y, markerId }) {
    return {
        id,
        label,
        markers: [
            {
                id: markerId,
                x,
                y,
                label,
                description:
                    descriptions[
                        `../assets/descriptions/${countryFolder}/${markerId}.txt`
                    ],
                audio: sounds[`../assets/sounds/${countryFolder}/${markerId}.mp3`],
                image:
                    imageFiles[
                        `../assets/images/modal/${countryFolder}/${markerId}.jpg`
                    ],
            },
        ],
    }
}

export default {
    de: createSimpleCountry('Germany', {
        id: 'de',
        label: 'Germany',
        x: 2509,
        y: 1714,
        markerId: 'co1013_00',
    }),

    ch: createSimpleCountry('Switzerland', {
        id: 'ch',
        label: 'Switzerland',
        x: 2454,
        y: 1760,
        markerId: 'co1014_00',
    }),

    africa: createSimpleCountry('Africa', {
        id: 'africa',
        label: 'Africa',
        x: 2571,
        y: 2319,
        markerId: 'co1912_01',
    }),

    gb: createSimpleCountry('England', {
        id: 'gb',
        label: 'England',
        x: 2451,
        y: 1635,
        markerId: 'co1913_01',
    }),

    th: createSimpleCountry('Siam', {
        id: 'th',
        label: 'Siam',
        x: 3134,
        y: 2171,
        markerId: 'co1928_01',
    }),

    sg: createSimpleCountry('Singapore', {
        id: 'sg',
        label: 'Singapore',
        x: 3160,
        y: 2290,
        markerId: 'co0806_00',
    }),

    lk: createSimpleCountry('Colombo', {
        id: 'lk',
        label: 'Colombo',
        x: 2996,
        y: 2242,
        markerId: 'co1406_00',
    }),

    eg: createSimpleCountry('Egypt', {
        id: 'eg',
        label: 'Egypt',
        x: 2561,
        y: 2044,
        markerId: 'co3006_00',
    }),

    es: createSimpleCountry('Spain', {
        id: 'es',
        label: 'Spain',
        x: 2317,
        y: 1782,
        markerId: 'co1000_00',
    }),

    pt: createSimpleCountry('Portugal', {
        id: 'pt',
        label: 'Portugal',
        x: 2266,
        y: 1796,
        markerId: 'co1001_00',
    }),

    dz: createSimpleCountry('Algérie', {
        id: 'dz',
        label: 'Algérie',
        x: 2262,
        y: 1945,
        markerId: 'co1002_00',
    }),

    tn: createSimpleCountry('Tunisia', {
        id: 'tn',
        label: 'Tunisia',
        x: 2401,
        y: 1908,
        markerId: 'co1003_00',
    }),

    cg: createSimpleCountry('Congo', {
        id: 'cg',
        label: 'Congo',
        x: 2467,
        y: 2289,
        markerId: 'co1004_00',
    }),

    sn: createSimpleCountry('Sénégal', {
        id: 'sn',
        label: 'Sénégal',
        x: 2065,
        y: 2067,
        markerId: 'co1005_00',
    }),

    gn: createSimpleCountry('Guinée', {
        id: 'gn',
        label: 'Guinée',
        x: 2169,
        y: 2148,
        markerId: 'co1006_00',
    }),

    bj: createSimpleCountry('Dahomey', {
        id: 'bj',
        label: 'Dahomey',
        x: 2269,
        y: 2189,
        markerId: 'co1007_00',
    }),

    mq: createSimpleCountry('Martinique', {
        id: 'mq',
        label: 'Martinique',
        x: 1475,
        y: 2168,
        markerId: 'co1008_00',
    }),

    ar: createSimpleCountry('Argentina', {
        id: 'ar',
        label: 'Argentina',
        x: 1417,
        y: 2684,
        markerId: 'co1009_00',
    }),

    uy: createSimpleCountry('Uruguay', {
        id: 'uy',
        label: 'Uruguay',
        x: 1486,
        y: 2644,
        markerId: 'co1010_00',
    }),

    be: createSimpleCountry('belgium', {
        id: 'be',
        label: 'Belgium',
        x: 2465,
        y: 1712,
        markerId: 'co1011_00',
    }),

    it: createSimpleCountry('Italia', {
        id: 'it',
        label: 'Italia',
        x: 2455,
        y: 1830,
        markerId: 'co1012_00',
    }),
}

