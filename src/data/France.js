import { buildCountryData } from '../utils/countryDataBuilder.js'

const France = buildCountryData('France', {
    id: 'fr',
    label: 'France',
    anchor: { x: 2425, y: 1740 },
    markerConfigs: [
        { id: 'pr1911_02', x: 2651, y: 2292, label: 'Marseille' },
        { id: 'pr1917_01', x: 2085, y: 841, label: 'Paris' },
    ],
    images: 'https://res.cloudinary.com/dmoegyeh9/image/upload/v1764499597/fr_yctdld.jpg',
})

export default France
