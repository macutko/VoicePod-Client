export const getSoundByIdAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("getSoundById", data, (error, response) => {
			if (error) {
				console.log(`Error in getSoundById ${error}`)
				reject({})
			} else {
				console.log(`Success in getSoundById  ${response}`)
				fulfill(response)
			}
		})
	})

}
