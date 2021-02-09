export const getPaidChatsByUserIdAPI = ({socket, data}) => {
    return new Promise((fulfill, reject) => {

        socket.emit('getPaidChatsByUserId', data, (error, response) => {
            if (error) {
                console.log(`Error in getPaidChatsByUserId ${error}`)
                reject({})
            } else {
                console.log(`Amount of chats: ${response.length}`)
                fulfill(response)

            }
        })
    })

}
