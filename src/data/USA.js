import { buildCountryData } from '../utils/countryDataBuilder.js'

const USA = buildCountryData('USA', {
    id: 'usa',
    label: 'United States',
    anchor: { x: 1300, y: 2000 },
    markerConfigs: [{ id: 'pr1912_02', x: 3550, y: 1010, label: 'Newyork' }],
    images: 'https://res.cloudinary.com/dmoegyeh9/image/upload/v1764750668/ca000012_fy20kk.jpg',
})

export default USA
