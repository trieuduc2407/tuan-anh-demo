import { buildCountryData } from "../utils/countryDataBuilder"

const USSR = buildCountryData('USSR', {
    id: 'ussr',
    label: 'USSR',
    anchor: { x: 3000, y: 1700 },
    markerConfigs: [
       { id: 'pr1933_01', x: 338, y: 279, label: 'Moskva' },
       { id: 'pr1923_01', x: 358, y: 299, label: 'Moskva' },
    ],
    images: 'https://res.cloudinary.com/dmoegyeh9/image/upload/v1765039418/ussr_gsi53n.jpg',
})

export default USSR