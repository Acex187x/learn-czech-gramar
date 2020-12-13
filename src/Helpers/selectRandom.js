function selectRandom(array) {
    return array[~~(Math.random() * array.length)]
}

export default selectRandom;