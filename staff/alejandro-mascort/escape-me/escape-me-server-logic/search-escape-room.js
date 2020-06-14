require('escape-me-commons/polyfills/string')
require('escape-me-commons/polyfills/number')
require('escape-me-commons/polyfills/json')
const { models: { EscapeRoom } } = require('escape-me-data')

module.exports = (query = '', { moreThanPriceMin, lessThanPriceMin, moreThanPriceMax, lessThanPriceMax, moreThanPlayersMin, lessThanPlayersMin, moreThanPlayersMax, lessThanPlayersMax, genre, difficulty, moreThanRating, lessThanRating }) => {
    const filter = []

    if (query) String.validate.notVoid(query)

    filter.push({ name: { $regex: query } })

    if (arguments.length > 1 && !typeof arguments[1] === 'object') throw new TypeError('second argument must be an instance of object')
    else if (arguments.length < 2) throw new Error('invalid arguments introduced')

    if (moreThanPriceMin) {
        Number.validate.positive(moreThanPriceMin)
        filter.push({ priceMin: { $gte: (moreThanPriceMin) } })
    }
    if (lessThanPriceMin) {
        Number.validate.positive(lessThanPriceMin)
        filter.push({ priceMin: { $lte: (lessThanPriceMin) } })
    }

    if (moreThanPriceMax) {
        Number.validate.positive(moreThanPriceMax)
        filter.push({ priceMax: { $gte: (moreThanPriceMax) } })
    }
    if (lessThanPriceMax) {
        Number.validate.positive(lessThanPriceMax)
        filter.push({ priceMax: { $lte: (lessThanPriceMax) } })
    }

    if (moreThanPlayersMin) {
        Number.validate.positive(moreThanPlayersMin)
        filter.push({ playersMin: { $gte: (moreThanPlayersMin) } })
    }
    if (lessThanPlayersMin) {
        Number.validate.positive(lessThanPlayersMin)
        filter.push({ playersMin: { $lte: (lessThanPlayersMin) } })
    }

    if (moreThanPlayersMax) {
        Number.validate.positive(moreThanPlayersMax)
        filter.push({ playersMax: { $gte: (moreThanPlayersMax) } })
    }
    if (lessThanPlayersMax) {
        Number.validate.positive(lessThanPlayersMax)
        filter.push({ playersMax: { $lte: (lessThanPlayersMax) } })
    }
    if (genre && genre instanceof Array) {
        genre.forEach(item => String.validate.notVoid(item))
        filter.push({ genre: { $in: genre } })
    }
    if (difficulty && genre instanceof Array) {
        difficulty.forEach(item => Number.validate.positive(item))
        filter.push({ difficulty: { $in: difficulty } })
    }

    if (moreThanRating) {
        Number.validate.positive(moreThanRating)
        filter.push({ rating: { $gte: (moreThanRating) } })
    }
    if (lessThanRating) {
        Number.validate.positive(lessThanRating)
        filter.push({ rating: { $lte: (lessThanRating) } })
    }

    return (async () => {
        let escapeRooms = await EscapeRoom.find({ $and: filter })

        escapeRooms = escapeRooms.map(({ _id, name, priceMin, priceMax, playersMin, playersMax, genre, city, image, rating }) => ({ id: _id, name, priceMin, priceMax, playersMin, playersMax, genre, city, image, rating }))

        return escapeRooms
    })()
}