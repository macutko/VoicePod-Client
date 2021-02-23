import {axiosInstance} from "../../utilities/ConnectionUtils"


const getCurrentUserAPI = async(token) => {

	return new Promise((fulfill, reject) => {

		axiosInstance
			.get("/user/getCurrentUser", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(
					`Tried checking current user ${JSON.stringify(
						response.data.user.username
					)}`
				)
				if (response.data.user.username != null) {
					fulfill(response.data.user)
				} else reject({})
			})
			.catch((error) => {
				console.log(`Error in App.js ${error}`)
				console.log(error)
				reject({})
			})


	})

}

export default getCurrentUserAPI
