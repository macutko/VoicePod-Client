export const getOffersByUserIdAPI = ({socket,data}) => {
    return new Promise((fulfill, reject) => {
        socket.emit('getOffersByUserId', {}, (error, response) => {
            if (!error) {
                console.log(`Amount of offers: ${response.length}`)
                console.log(Object.keys(response[0]))
                fulfill(response)
            } else {
                console.log(`Error in getOffersById ${error}`)
                reject({})
            }
        })
    })

}
