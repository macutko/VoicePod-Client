export const acceptOfferAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('acceptOffer', data, (error, response) => {
            if (!error) {
                console.log(`Offer accepted API`)
                fulfill(response)
            } else {
                console.log(`Error in  accept offer API ${error}`)
                reject({})
            }
        })
    })

}
