import AsyncStorage from "@react-native-community/async-storage";


const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving data!!!");
    }
};

const getFromMemory = async (keys) => {
    try {
        let values;
        if (Array.isArray(keys)) {
            let promises = [];
            keys.forEach((key) => promises.push(AsyncStorage.getItem(key)));
            values = await Promise.all(promises);
            return values.filter((v) => v != null);
        }
        return await AsyncStorage.getItem(keys);
    } catch (error) {
        console.log(error);
    }
};

const removeFromMemory = async (keys) => {
    try {
        if (Array.isArray(keys)) {
            let promises = [];
            keys.forEach((key) => promises.push(AsyncStorage.removeItem(key)));
            await Promise.all(promises);
        } else {
            await AsyncStorage.removeItem(keys);
        }
    } catch (error) {
        console.log(error);
    }
};

const getUsername = async () => {
    try {
        const name = await AsyncStorage.getItem("username");
        if (name === undefined) {
            console.log("got nothing on name!");
            console.log(name);
        }
        return name;
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getFromMemory,
    removeFromMemory,
    getUsername,
    storeData
};
