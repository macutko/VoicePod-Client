export const getOffersByUserId = ({socket,data}) => {
    return new Promise((fulfill, reject) => {
        socket.emit('getOffersByUserId', {}, (error, response) => {
            if (!error) {
                console.log(`Amount of offers: ${response.length}`)
                fulfill(response)
            } else {
                console.log(`Error in getOffersById ${error}`)
                reject({})
            }
        })
    })

}
