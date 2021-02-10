export const getFreeChatsByUserIdAPI = ({socket, data}) => {
    return new Promise((fulfill, reject) => {
        socket.emit('getFreeChatsByUserId', data, (error, response) => {
            if (error) {
                console.log(`Error in getFreeChatsByUserId ${error}`)
                reject({})
            } else {
                console.log(`Amount of free chats: ${response.length}`)
                fulfill(response)

            }
        })
    })

}
