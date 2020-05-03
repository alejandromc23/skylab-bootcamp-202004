function tweet(token, message, tweets = [], callback){
    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    let newTweet = {message, date: new Date }
    tweets.push(newTweet)
    
    let url = 'https://skylabcoders.herokuapp.com/api/v2/users'
    let body = JSON.stringify({tweets})
    let headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }

    call('PATCH', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 204){
            return callback(undefined, newTweet)
        }
        const {error: responseError} = JSON.parse(response)
        if (responseError) callback(new Error(responseError))
    })
}
