const imageFiles = import.meta.glob('./*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
})

const modalImages = {}
Object.entries(imageFiles).forEach(([path, module]) => {
    const name = path.replace('./', '').replace(/\.(jpg|jpeg|png|webp)$/, '')
    modalImages[name] = module
})

export default modalImages
