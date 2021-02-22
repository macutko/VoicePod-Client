export const setCloseChatAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('setCloseChat', data, (error, response) => {
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
