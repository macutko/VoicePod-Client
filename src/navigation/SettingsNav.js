import {createStackNavigator} from "@react-navigation/stack";
import UserProfileSettings from "../components/organisms/SettingsTab/UserProfileSettings";
import PrivacySettings from "../components/organisms/SettingsTab/PrivacySettings";
import PaymentsSettings from "../components/organisms/SettingsTab/PaymentsSettings";
import ContactSupport from "../components/molecules/SettingsTab/ContactSupport";
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
                {props => <PaymentsSettings {...props} {...inheritance}/>}
            </SettingsStack.Screen>
            <SettingsStack.Screen name="ContactSupport">
                {props => <ContactSupport {...props} {...inheritance}/>}
            </SettingsStack.Screen>
        </SettingsStack.Navigator>)
}

export default SettingsTab
