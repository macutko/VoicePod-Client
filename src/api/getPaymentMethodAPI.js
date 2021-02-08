export const getPaymentMethodAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {

        socket.emit('getPaymentMethod', data, (error, response) => {
            if (error) {
                console.log(`Error in getPaymentMethod ${error}`)
                reject({})
            } else {
                console.log(`Res getPaymentMethod: ${response}`)
                fulfill(response)

            }
        })
    })

}
