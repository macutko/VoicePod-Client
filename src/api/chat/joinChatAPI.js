export const joinChatAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("joinChat", data, (error, response) => {
			if (error) {
				console.log(`Error in joinChat ${error}`)
				reject({})
			} else {
				console.log(`Joined chat response: ${response}`)
				fulfill(response)

			}
		})
	})

}
