import {TouchableOpacity} from "react-native";
import {Avatar} from "react-native-paper";
import React, {useContext} from "react";
import GlobalContext from "../../atoms/GlobalState";
import * as ImagePicker from 'expo-image-picker';
import {FileSystem} from "react-native-unimodules";

const EditUserProfilePicture = ({submit}) => {
    const context = useContext(GlobalContext);

    const getPerm = async () => {
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return false
            } else return true
        }
    }


    const pickImage = async () => {
        if (await getPerm()) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.2,
            });

            console.log(result);

            if (!result.cancelled) {
                let picType = result.uri.split(".")
                picType = picType[picType.length - 1]
                FileSystem.readAsStringAsync(result.uri, {encoding: FileSystem.EncodingType.Base64}).then((data) => {
                    submit({profilePicture: data, pictureType: picType})
                }).catch(e => (console.log(e)))


            }
        }
    };

    return (
        <TouchableOpacity onPress={pickImage}>
            <Avatar.Image size={200}
                          source={{uri: `data:image/${context.globalState.user.pictureType};base64,${context.globalState.user.profilePicture}`}}/>
        </TouchableOpacity>

    )
}
export {EditUserProfilePicture}
