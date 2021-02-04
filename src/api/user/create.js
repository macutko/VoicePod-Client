import {axiosInstance} from "../../utilities/ConnectionUtils";
import {storeData} from "../../utilities/StorageUtils";


const createAPI = async (firstName, lastName, email, username, password) => {
    console.log(email)
    return new Promise((fulfill, reject) => {
        axiosInstance
            .post("/user/create", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: password,
            })
            .then((response) => {
                storeData("token", response.data.token).then();
                fulfill([response.data.user, response.data.token])
            })
            .catch((error) => {
                reject(error)
                console.log(`Error in createAPI ${error}`);
            });
    })

}

export default createAPI
