import {PermissionsAndroid} from "react-native";

export default async function getRecord() {
    let res = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    for (const perm of Object.keys(res)) {
        if (res[perm] !== 'granted') return false
    }
    return true
}
