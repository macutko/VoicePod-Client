export const getSentOffersByUserIdAPI = ({socket,data}) => {
    return new Promise((fulfill, reject) => {
        socket.emit('getSentOffersByUserId', {}, (error, response) => {
            if (!error) {
                console.log(`Amount of sent offers: ${response.length}`)
                fulfill(response)
            } else {
                console.log(`Error in getSentOffersByUserId ${error}`)
                reject({})
            }
        })
    })

}
