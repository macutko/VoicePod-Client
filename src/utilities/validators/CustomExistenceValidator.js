import {axiosInstance} from "../ConnectionUtils"

const CustomExistenceValidator = (fieldName, text) => {

	return new Promise((resolve) => {
		axiosInstance
			.get("/user/exists", {
				params: {
					[fieldName]: text,
				},
			})
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export {CustomExistenceValidator}
