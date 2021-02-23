export const getResolvedOffersByUserIdAPI = ({socket, data}) => {
	return new Promise((fulfill, reject) => {
		socket.emit("getResolvedOffersByUserId", {}, (error, response) => {
			if (!error) {
				console.log(`Amount of resolved offers: ${response.length}`)
				fulfill(response)
			} else {
				console.log(`Error in getResolvedOffersByUserId ${error}`)
				reject({})
			}
		})
	})

}
