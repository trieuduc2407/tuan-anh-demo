const audioFiles = import.meta.glob('./*.mp3', {
    eager: true,
    import: 'default',
})

const sounds = {}
Object.entries(audioFiles).forEach(([path, module]) => {
    const name = path.replace('./', '').replace('.mp3', '')
    sounds[name] = module
})

export default sounds
