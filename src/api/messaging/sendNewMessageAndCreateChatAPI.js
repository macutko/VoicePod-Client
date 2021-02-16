export const sendNewMessageAndCreateChatAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('sendNewMessageAndCreateChat', data, (error, response) => {
            if (error) {
                console.log(`Error in sendNewMessageAndCreateChat ${error}`)
                reject({})
            } else {
                console.log(`Result sendNewMessageAndCreateChat: ${response}`)
                fulfill(response)

            }
        })
    })

}
