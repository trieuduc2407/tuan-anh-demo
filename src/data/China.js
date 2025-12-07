import { buildCountryData } from '../utils/countryDataBuilder.js'

const China = buildCountryData('China', {
    id: 'cn',
    label: 'China',
    anchor: { x: 3250, y: 2050 },
    markerConfigs: [
        { id: 'pr1924_01', x: 751, y: 837, label: 'Quang Chau' },
        { id: 'pr1929_01', x: 780, y: 868, label: 'Hong Kong' },
        { id: 'pr1938_01', x: 675, y: 831, label: 'Quang Tay' },
        { id: 'pr1938_02', x: 648, y: 775, label: 'Quy Chau' },
        { id: 'pr1938_03', x: 526, y: 802, label: 'Van Nam' },
        { id: 'pr1938_04', x: 732, y: 513, label: 'Thiem Tay' },

    ],
    images: 'https://res.cloudinary.com/dmoegyeh9/image/upload/v1764929015/china_lbvupr.jpg',
})

export default China
