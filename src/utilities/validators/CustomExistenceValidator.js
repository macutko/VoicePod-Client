import {axiosInstance} from "../ConnectionUtils";

const CustomExistenceValidator = (field_name, text) => {

    return new Promise((resolve, reject) => {
        axiosInstance
            .get("/user/exists", {
                params: {
                    [field_name]: text,
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    });
}

export {CustomExistenceValidator}
