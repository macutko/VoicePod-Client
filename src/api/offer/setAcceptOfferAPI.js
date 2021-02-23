export const setAcceptOfferAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("setAcceptOffer", data, (error, response) => {
			if (!error) {
				fulfill(response)
			} else {
				console.log(`Error in  accept offer API ${error}`)
				reject({})
			}
		})
	})

}
