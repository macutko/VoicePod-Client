import {createStackNavigator} from "@react-navigation/stack";
import UserProfileSettings from "../components/organisms/SettingsTab/UserProfileSettings";
import PrivacySettings from "../components/molecules/PrivacySettings";
import Payments from "../components/molecules/Payments";
import ContactSupport from "../components/molecules/ContactSupport";
import React from "react";
import {Settings} from "../screens/tabs/SettingsTab";

const SettingsStack = createStackNavigator();

const SettingsTab = (inheritance) => {
    return (
        <SettingsStack.Navigator screenOptions={{headerShown: false}}>
            <SettingsStack.Screen name="Settings">
                {props => <Settings {...props} {...inheritance}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name="UserProfileSettings">
                {props => <UserProfileSettings {...props} {...inheritance}/>}
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

export default SettingsTab