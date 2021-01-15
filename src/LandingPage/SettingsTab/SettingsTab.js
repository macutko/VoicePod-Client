import React from "react";
import {Avatar, List} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import UserProfile from "./UserProfile";
import PrivacySettings from "./PrivacySettings";
import Payments from "./Payments";
import ContactSupport from "./ContactSupport";
import GlobalContext from "../../GlobalState";

const SettingsStack = createStackNavigator();

const SettingsTab = () => {
    return (
        <SettingsStack.Navigator screenOptions={{headerShown: false}}>
            <SettingsStack.Screen name="Settings">
                {props => <Settings params={props}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name="UserProfile" component={UserProfile}/>
            <SettingsStack.Screen name="PrivacySettings" component={PrivacySettings}/>
            <SettingsStack.Screen name="Payments" component={Payments} initialParams={{...props}}/>
            <SettingsStack.Screen name="ContactSupport" component={ContactSupport}/>
        </SettingsStack.Navigator>)
}

export class Settings extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);
        console.log(props.params)
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
                           title="User Name"
                           left={props => <List.Icon {...props} style={styles.profilePic}
                                                     icon={props => <Avatar.Image source={{
                                                         uri: `data:image/${this.context.globalState.user.pictureType};base64,
                                                                                                  ${this.context.globalState.user.profilePicture}`
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
                    title="Delete Account"
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'trash-bin'}/>}/>}
                />
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
