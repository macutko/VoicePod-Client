import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {colorScheme} from "../components/constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import ChatsTab from "./ChatsTab/ChatsTab";
import SearchTab from "./SearchTab/SearchTab";
import SettingsTab from "./SettingsTab/SettingsTab";
import React from "react";
import OffersTab from "./OffersTab/OffersTab";

const TabNav = createMaterialBottomTabNavigator();


export const TabNavWrapper = (inheritance) => {
    return (
        <TabNav.Navigator
            initialRouteName="Search"
            activeColor={colorScheme.primary}
            inactiveColor={colorScheme.accent}
            barStyle={{backgroundColor: colorScheme.background}}
        >

            <TabNav.Screen name="Chats" options={{
                tabBarLabel: 'Chats',
                tabBarIcon: ({color}) => (
                    <Ionicons name={'chatbubble-ellipses'} size={26} color={color}/>
                ),
            }}>
                {props => <ChatsTab  {...inheritance} {...props} mainNav={inheritance.navigation}/>}
            </TabNav.Screen>

            <TabNav.Screen name="Offers" options={{
                tabBarLabel: 'Offers',
                tabBarIcon: ({color}) => (
                    <Ionicons name={'list-circle'} size={26} color={color}/>
                ),
            }}>
                {props => <OffersTab  {...inheritance} {...props} mainNav={inheritance.navigation}/>}
            </TabNav.Screen>

            <TabNav.Screen name="Search" options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({color}) => (
                    <Ionicons name={'search'} size={26} color={color}/>
                ),
            }}>
                {props => <SearchTab   {...inheritance} {...props} mainNav={inheritance.navigation}/>}
            </TabNav.Screen>

            <TabNav.Screen name="Settings" options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color}) => (
                    <Ionicons name={'settings'} size={26} color={color}/>
                ),
            }}>
                {props => <SettingsTab  {...inheritance} {...props} mainNav={inheritance.navigation}/>}
            </TabNav.Screen>


        </TabNav.Navigator>
    )
}
