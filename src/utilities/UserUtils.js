import {removeFromMemory} from "./StorageUtils";

const logOut = async (updateGlobalState) => {
    updateGlobalState({}, '', false)
    await removeFromMemory("token")
}

export {logOut}