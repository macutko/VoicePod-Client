export const getChatsByUserIdAPI = ({socket, data}) => {
    return new Promise((fulfill, reject) => {

        socket.emit('getChatsByUserId', data, (error, response) => {
            if (error) {
                console.log(`Error in getChatsByUserId ${error}`)
                reject({})
            } else {
                console.log(`Amount of chats: ${response.length}`)
                fulfill(response)

            }
        })
    })

}
