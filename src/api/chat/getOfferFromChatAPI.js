export const getOfferFromChatAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("getOfferFromChat", data, (error, response) => {
			if (error) {
				console.log(`Error in getOfferFromChat ${error}`)
				reject({})
			} else {
				console.log(`Response on offerFrom Chat: ${Object.keys(response)}`)
				fulfill(response
				)

			}
		})
	})

}
