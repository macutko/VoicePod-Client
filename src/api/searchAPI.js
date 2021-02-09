export const searchAPI = ({socket, data}) => {
    return new Promise((fulfill, reject) => {

        socket.emit('search', data, (error, response) => {
            if (error) {
                console.log(`Error in search ${error}`)
                reject({})
            } else {
                console.log(`Amount of search results: ${response.length}`)
                fulfill(response)

            }
        })
    })

}
