/**
 * Return the details of the other party in the chat, may that be a customer or a consultant
 * @param socket
 * @param data - data.chatId
 * @returns {Promise<R>}
 */
export const getOtherPartyDetailsByChatIdAPI = (socket, data) => {
	return new Promise((fulfill, reject) => {
		socket.emit("getOtherPartyDetailsByChatId", data, (error, response) => {
			if (error) {
				console.log(`Error in getOtherPartyDetailsByChatId ${error}`)
				reject({})
			} else {
				console.log(`Response length: ${Object.keys(response).length}`)
				fulfill(response)

			}
		})
	})

}
