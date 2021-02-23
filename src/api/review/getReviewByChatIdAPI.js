export const getReviewByChatIdAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {

		socket.emit("getReviewByChatId", data, (error, response) => {
			if (error) {
				console.log(`Error in getReviewByChatId ${error}`)
				reject({})
			} else {
				console.log(`getReviewByChatId: ${response.length}`)
				fulfill(response)

			}
		})
	})

}
