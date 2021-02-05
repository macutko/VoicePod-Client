import {PermissionsAndroid} from "react-native";

export default async function getRecord() {
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
}
