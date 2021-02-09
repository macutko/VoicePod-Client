export const rejectOfferAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('rejectOffer', data, (error, response) => {
            if (!error) {
                console.log(`Offer rejected API`)
                fulfill(response)
            } else {
                console.log(`Error in  reject offer API ${error}`)
                reject({})
            }
        })
    })

}
