export const createOfferAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("createOffer", data, (error, response) => {
			if (error) {
				console.log(`Error in checkDefaultPaymentMethod ${error}`)
				reject({})
			} else {
				console.log(`Create offer ${response}`)
				fulfill(response)
			}
		})
	})

}
