export const getPendingOffersByUserIdAPI = ({socket, data}) => {
	return new Promise((fulfill, reject) => {
		socket.emit("getPendingOffersByUserId", {}, (error, response) => {
			if (!error) {
				console.log(`Amount ofpending  offers: ${response.length}`)
				fulfill(response)
			} else {
				console.log(`Error in getPendingOffersByUserId ${error}`)
				reject({})
			}
		})
	})

}
