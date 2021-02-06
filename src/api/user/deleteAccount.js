import {axiosInstance} from "../../utilities/ConnectionUtils";


const deleteAccountAPI = async (token) => {

    return new Promise((fulfill, reject) => {
        axiosInstance
            .get("/user/deleteAccount", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => {
                console.log(`Response on delete User ${response.status}`)
                fulfill()
            })
            .catch((error) => {
                console.log(`Error in deleteAccountAPI ${error}`)
                reject()
            });
    })

}

export default deleteAccountAPI
