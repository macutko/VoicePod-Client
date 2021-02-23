import {axiosInstance} from "../../utilities/ConnectionUtils"
import {storeData} from "../../utilities/StorageUtils"


const authenticateUserAPI = async(username, password) => {

	return new Promise((fulfill, reject) => {
		axiosInstance.post("/user/authenticateUser", {
			username: username,
			password: password,
		}).then((response) => {
			storeData("token", response.data.token).then()
			fulfill([response.data.user, response.data.token])
		}).catch((error) => {
			if (error.response == null || error.response.status === undefined) {
				console.log(`Error on Authentication ${error}`)
				reject({})
			}
			switch (error.response.status) {
			case 401:
				reject({
					passwordError: error.response.data.message,
					isUsernameWrong: false,
					isPasswordWrong: true,
				})
				break
			case 404:
				reject({
					passwordError: error.response.data.message,
					isUsernameWrong: true,
					isPasswordWrong: false,
				})
				break
			default:
				console.log("Havent accounted for this error code")
				reject({})
				break
			}
		})
	})

}

export default authenticateUserAPI
