import React from "react";
import {List} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import UserProfile from "./UserProfile";

export const navigationRef = React.createRef();
const SettingsStack = createStackNavigator();

const SettingsTab = () => {
    return (
        <SettingsStack.Navigator screenOptions={{headerShown: false}}>
            <SettingsStack.Screen name="Settings" component={Settings}/>
            <SettingsStack.Screen name="UserProfile" component={UserProfile}/>
        </SettingsStack.Navigator>)
}

export class Settings extends React.Component {

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
                           onPress={() => console.log(this.props.navigation.navigate('UserProfile'))}
                           title="User Name"
                           left={props => <List.Icon {...props} style={styles.profilePic}
                                                     icon={props => <Ionicons {...props} name={'image'}/>}/>}
                />
                <List.Item
                    title="Privacy"
                    description={"Notifications"}
                    left={props => <List.Icon {...props}
                                              icon={props => <Ionicons {...props} name={'notifications'}/>}/>}
                />
                <List.Item
                    title="Payments"
                    description={"Accounts, billing address"}
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'pricetag'}/>}/>}
                />
                <List.Item
                    title="Contact Support"
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
        paddingBottom: 10,
        fontSize: 30,
        fontWeight: "bold",
    },
    profilePic: {
        height: 70
    }

});
