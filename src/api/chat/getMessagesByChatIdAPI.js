export const getMessagesByChatIdAPI = ({socket, data}) => {
    return new Promise((fulfill, reject) => {

        socket.emit('getMessages', data, (error, response) => {
            if (error) {
                console.log(`Error in getMessages ${error}`)
                reject({})
            } else {
                console.log(`Amount of Messages: ${response.length}`)
                fulfill(response)

            }
        })
    })

}
