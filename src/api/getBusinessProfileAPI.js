export const getBusinessProfileAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("getBusinessProfile", data, (error, response) => {
			if (error) {
				console.log(`Error in getBusinessProfile ${error}`)
				reject({})
			} else {
				console.log(`Response in getBusinessProfile  ${response}`)
				fulfill(response)
			}
		})
	})

}
