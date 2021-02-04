import {PermissionsAndroid, TouchableOpacity} from "react-native";
import {Avatar} from "react-native-paper";
import React, {useContext} from "react";
import * as RNFS from "react-native-fs";
import {launchImageLibrary} from "react-native-image-picker";
import GlobalContext from "../../atoms/GlobalState";

const EditUserProfilePicture = ({submit}) => {
    const context = useContext(GlobalContext);

    const requestPermissions = async () => {
        PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]).then().catch(e => console.log(`Error in UserProfile ${e}`));
    }

    const newImage = async () => {
        if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) await requestPermissions()
        if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)) await requestPermissions()
        if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)) await requestPermissions()

        launchImageLibrary({}, res => {
            console.log('Response = ', res);

            if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (!res.didCancel) {
                let picType = res.uri.split(".")
                picType = picType[picType.length - 1]
                RNFS.readFile(res.uri, 'base64')
                    .then((data) => {
                        submit({profilePicture: data, pictureType: picType})
                    }).catch(e => console.log(`Error in UserProfile ${e}`))


            }
        });
    }
    return (<TouchableOpacity onPress={newImage}>
        <Avatar.Image size={200}
                      source={{uri: `data:image/${context.globalState.user.pictureType};base64,${context.globalState.user.profilePicture}`}}/>
    </TouchableOpacity>)
}
export {EditUserProfilePicture}