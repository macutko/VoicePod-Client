import {axiosInstance} from "../../utilities/ConnectionUtils"


const updateUserAPI = async(data, token) => {

	return new Promise((fulfill, reject) => {
		axiosInstance
			.post("/user/updateUser", data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(`Response from updateAccount ${response.status}`)
				fulfill(response.data)
			})
			.catch((error) => {
				console.log(`Error in updateAccount ${error}`)
				reject()
			})
	})

}

export default updateUserAPI
