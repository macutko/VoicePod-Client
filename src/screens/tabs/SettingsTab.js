import React from "react";
import {Avatar, List} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import UserProfileSettings from "../../components/organisms/SettingsTab/UserProfileSettings";
import PrivacySettings from "../../components/organisms/SettingsTab/PrivacySettings";
import PaymentsSettings from "../../components/organisms/SettingsTab/PaymentsSettings";
import ContactSupport from "../../components/molecules/ContactSupport";
import ConfirmDelete from "../../components/molecules/SettingsTab/ConfirmDelete";
import {logOut} from "../../utilities/UserUtils";


export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteUserDialog: false
        }
    }

    toggleDialog = () => {
        this.setState(prevState => ({
            deleteUserDialog: !prevState.deleteUserDialog
        }))
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
                           onPress={() => this.props.navigation.navigate('UserProfileSettings')}
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
                    onPress={() => logOut(this.props.updateGlobalState)}
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'log-out'}/>}/>}
                />
                <List.Item
                    title="Delete Account"
                    onPress={() => this.toggleDialog()}
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'trash-bin'}/>}/>}
                />

                <ConfirmDelete deleteUserDialog={this.state.deleteUserDialog} toggleDialog={this.toggleDialog}
                               logOut={() => logOut(this.props.updateGlobalState)}/>

            </List.Section>


        );
    }
}


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
