export const checkDefaultPaymentMethod = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('checkDefaultPaymentMethod', data, (error, response) => {
            if (error) {
                console.log(`Error in checkDefaultPaymentMethod ${error}`)
                reject({})
            } else {
                console.log(`Default payment method ${response}`)
                fulfill(response)
            }
        })
    })

}
