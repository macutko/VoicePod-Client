export const getOfferByIdAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('getOfferById', data, (error, response) => {
            if (!error) {
                console.log(`Offers details success`)
                fulfill(response)
            } else {
                console.log(`Error in getOfferDetailsById ${error}`)
                reject({})
            }
        })
    })

}
