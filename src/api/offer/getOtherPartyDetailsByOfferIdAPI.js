/**
 * Return the details of the other party in the chat, may that be a customer or a consultant
 * @param socket
 * @param data - data.offerId
 * @returns {Promise<R>}
 */
export const getOtherPartyDetailsByOfferIdAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('getOtherPartyDetailsByOfferId', data, (error, response) => {
            if (error) {
                console.log(`Error in getOtherPartyDetailsByOfferId ${error}`)
                reject({})
            } else {
                console.log(`Response length: ${Object.keys(response).length}`)
                fulfill(response)

            }
        })
    })

}
