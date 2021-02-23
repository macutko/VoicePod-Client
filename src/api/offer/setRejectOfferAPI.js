export const setRejectOfferAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("setRejectOffer", data, (error, response) => {
			if (!error) {
				fulfill(response)
			} else {
				console.log(`Error in  reject offer API ${error}`)
				reject({})
			}
		})
	})

}
