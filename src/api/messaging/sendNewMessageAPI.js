export const sendNewMessageAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("createMessage", data, (error, response) => {
			if (error) {
				console.log(`Error in newMessage ${error}`)
				reject({})
			} else {
				console.log(`newMessage response: ${Object.keys(response)}`)
				fulfill(response)

			}
		})
	})

}
