import React, {useState} from "react";
import {Avatar, List} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import UserProfileSettings from "../../components/organisms/SettingsTab/UserProfileSettings";
import PrivacySettings from "../../components/organisms/SettingsTab/PrivacySettings";
import ContactSupport from "../../components/molecules/SettingsTab/ContactSupport";
import ConfirmDelete from "../../components/molecules/SettingsTab/ConfirmDelete";
import {logOut} from "../../utilities/UserUtils";

export const Settings = (mainProps) => {
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);

    return (

        <List.Section>

            <List.Item titleStyle={styles.profile}
                       onPress={() => mainProps.navigation.navigate('UserProfileSettings')}
                       title={mainProps.globalState.user.firstName + " " + mainProps.globalState.user.lastName}
                       left={props => <List.Icon {...props} style={styles.profilePic}
                                                 icon={props => <Avatar.Image source={{
                                                     uri: `data:image/${mainProps.globalState.user.pictureType};base64,
                                                                                                  ${mainProps.globalState.user.profilePicture}`
                                                 }}/>}/>}
            />
            <List.Item
                title="Privacy"
                onPress={() => mainProps.navigation.navigate('PrivacySettings')}
                description={"Notifications"}
                left={props => <List.Icon {...props}
                                          icon={props => <Ionicons {...props} name={'notifications'}/>}/>}
            />
            <List.Item
                title="Payments"
                onPress={() => mainProps.navigation.navigate('Payments')}
                description={"Accounts, billing address"}
                left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'pricetag'}/>}/>}
            />
            <List.Item
                title="Contact Support"
                onPress={() => mainProps.navigation.navigate('ContactSupport')}
                left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'call'}/>}/>}
            />
            <List.Item
                title="Logout"
                onPress={() => logOut(mainProps.updateGlobalState)}
                left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'log-out'}/>}/>}
            />
            <List.Item
                title="Delete Account"
                onPress={() => setDeleteUserDialog(!deleteUserDialog)}
                left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'trash-bin'}/>}/>}
            />

            <ConfirmDelete deleteUserDialog={deleteUserDialog}
                           toggleDialog={() => setDeleteUserDialog(!deleteUserDialog)}
                           logOut={() => logOut(mainProps.updateGlobalState)}/>

        </List.Section>


    );

}

export default Settings


const styles = StyleSheet.create({
    profile: {
        paddingBottom: 20,
        fontSize: 30,
        paddingLeft: 20,
        fontWeight: "bold",
    },
    profilePic: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
    }

});
