import React from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colorScheme} from "../constants/Colors";
import ChatsTab from "../screens/tabs/ChatsTab";

const ChatNav = createMaterialTopTabNavigator();

export const ChatNavigator = (inheritance) => {
    return (
        <ChatNav.Navigator
            initialRouteName="SearchTab"
            activeColor={colorScheme.primary}
            inactiveColor={colorScheme.accent}
            barStyle={{backgroundColor: colorScheme.background}}>
            <ChatNav.Screen
                name="StandardChats"
                options={{tabBarLabel: "Standard",}}
            >
                {(props) => (
                    <ChatsTab
                        {...inheritance}
                        {...props}
                    />
                )}
            </ChatNav.Screen>
            <ChatNav.Screen
                name="PaidChats"
                options={{tabBarLabel: "Paid",}}
            >
                {(props) => (
                    <ChatsTab
                        {...inheritance}
                        {...props}
                    />
                )}
            </ChatNav.Screen>
        </ChatNav.Navigator>

    );
};

