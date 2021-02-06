export const closeChatAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('closeChat', data, (error, response) => {
            if (error) {
                console.log(`Error in closeChat ${error}`)
                reject({})
            } else {
                console.log(`Response length: ${Object.keys(response)}`)
                fulfill(response)

            }
        })
    })

}
