import { buildCountryData } from '../utils/countryDataBuilder.js'

const Vietnam = buildCountryData('Vietnam', {
    id: 'vn',
    label: 'Vietnam',
    anchor: { x: 3190, y: 2200 },
    markerConfigs: [
        { id: 'pr1941_01', x: 484, y: 238, label: 'Cao Bang' },
        { id: 'pr1911_01', x: 521, y: 791, label: 'Ho Chi Minh' },
    ],
    images: 'https://res.cloudinary.com/dmoegyeh9/image/upload/v1764929016/vietnam_jftvki.jpg',
})

export default Vietnam
