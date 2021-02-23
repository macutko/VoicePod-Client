export const getReviewsOfUserAPI = ({socket, data}) => {
	return new Promise((fulfill, reject) => {

		socket.emit("getReviewsOfUser", data, (error, response) => {
			if (error) {
				console.log(`Error in getReviewsOfUser ${error}`)
				reject({})
			} else {
				console.log(`Amount of reviews: ${response.length}`)
				fulfill(response)

			}
		})
	})

}
