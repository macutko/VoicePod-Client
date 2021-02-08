export const updateReviewByChatIdAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {

        socket.emit('updateReviewByChatId', data, (error, response) => {
            if (error) {
                console.log(`Error in updateReviewByChatId ${error}`)
                reject({})
            } else {
                console.log(`updateReviewByChatId: ${response.length}`)
                fulfill(response)

            }
        })
    })

}
