import React from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {colorScheme} from "../../constants/Colors";
import ChatsList from "../../components/molecules/ChatsTab/ChatsList";

const ChatTab = createMaterialTopTabNavigator();

export const ChatNavigator = (inheritance) => {
    return (
        <ChatTab.Navigator
            initialRouteName="SearchTab"
            activeColor={colorScheme.primary}
            inactiveColor={colorScheme.accent}
            barStyle={{backgroundColor: colorScheme.background}}>
            <ChatTab.Screen
                name="StandardChats"
                options={{tabBarLabel: "Standard",}}
            >
                {(props) => (
                    <ChatsList
                        {...inheritance}
                        {...props}
                    />
                )}
            </ChatTab.Screen>
            <ChatTab.Screen
                name="PaidChats"
                options={{tabBarLabel: "Paid",}}
            >
                {(props) => (
                    <ChatsList
                        {...inheritance}
                        {...props}
                    />
                )}
            </ChatTab.Screen>
        </ChatTab.Navigator>

    );
};

