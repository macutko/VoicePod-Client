import React from "react";
import {Avatar, Button, Dialog, List, Paragraph, Portal} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import UserProfile from "../___________MainNav/SettingsTab/UserProfile";
import PrivacySettings from "../___________MainNav/SettingsTab/PrivacySettings";
import Payments from "../___________MainNav/SettingsTab/Payments";
import ContactSupport from "../___________MainNav/SettingsTab/ContactSupport";
import {axiosInstance} from "../utilities/ConnectionUtils";
import {removeFromMemory} from "../utilities/StorageUtils";

const SettingsStack = createStackNavigator();

const SettingsTab = (inheritance) => {
    return (
        <SettingsStack.Navigator screenOptions={{headerShown: false}}>
            <SettingsStack.Screen name="Settings">
                {props => <Settings {...props} {...inheritance}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name="UserProfile">
                {props => <UserProfile {...props} {...inheritance}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name="PrivacySettings">
                {props => <PrivacySettings {...props} {...inheritance}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name="Payments">
                {props => <Payments {...props} {...inheritance}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name="ContactSupport">
                {props => <ContactSupport {...props} {...inheritance}/>}
            </SettingsStack.Screen>
        </SettingsStack.Navigator>)
}

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteUserDialog: false
        }
    }


    logOut = () => {
        this.props.updateGlobalState({}, '', false)
        removeFromMemory("token").then()
    }

    toggleDialog = () => {
        this.setState(prevState => ({
            deleteUserDialog: !prevState.deleteUserDialog
        }))
    }

    confirmDelete = async () => {
        await axiosInstance
            .get("/user/deleteAccount", {
                headers: {
                    Authorization: `Bearer ${this.props.globalState.token}`
                },
            })
            .then((response) => {
                console.log(`Response on delete User ${response.status}`)
                this.logOut()
            })
            .catch((error) => {
                console.log(`Error in Payments ${error}`)
            });
    }

    render() {
        return (

            <List.Section>
                {/*
             Image - Name => change name or image + view profile
             Privacy => Notifications
             Payments => card/account, billing address
             Contact Support => Send us a message
             Danger Zone => Delete account
            */}

                <List.Item titleStyle={styles.profile}
                           onPress={() => this.props.navigation.navigate('UserProfile')}
                           title={this.props.globalState.user.firstName + " " + this.props.globalState.user.lastName}
                           left={props => <List.Icon {...props} style={styles.profilePic}
                                                     icon={props => <Avatar.Image source={{
                                                         uri: `data:image/${this.props.globalState.user.pictureType};base64,
                                                                                                  ${this.props.globalState.user.profilePicture}`
                                                     }}/>}/>}
                />
                <List.Item
                    title="Privacy"
                    onPress={() => this.props.navigation.navigate('PrivacySettings')}
                    description={"Notifications"}
                    left={props => <List.Icon {...props}
                                              icon={props => <Ionicons {...props} name={'notifications'}/>}/>}
                />
                <List.Item
                    title="Payments"
                    onPress={() => this.props.navigation.navigate('Payments')}
                    description={"Accounts, billing address"}
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'pricetag'}/>}/>}
                />
                <List.Item
                    title="Contact Support"
                    onPress={() => this.props.navigation.navigate('ContactSupport')}
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'call'}/>}/>}
                />
                <List.Item
                    title="Logout"
                    onPress={() => this.logOut()}
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'log-out'}/>}/>}
                />
                <List.Item
                    title="Delete Account"
                    onPress={() => this.toggleDialog()}
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'trash-bin'}/>}/>}
                />

                <Portal>
                    <Dialog visible={this.state.deleteUserDialog} onDismiss={this.toggleDialog}>
                        <Dialog.Title>Delete User</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Are you sure you want to delete your account? Your data will be permanently and
                                inadvertently erased. We will still collect any outstanding payments or open chats.
                                However, you might not get paid if you have open chats. Please close these chats
                                first.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this.confirmDelete}>Yes!</Button>
                            <Button onPress={this.toggleDialog}>No!</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </List.Section>


        );
    }
}

export default SettingsTab

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
