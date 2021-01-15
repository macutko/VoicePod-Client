import React from "react"
import SocketContextWrapper, {SocketContext} from "./SocketContextWrapper";
import GlobalContext from "../GlobalState";
import {colorScheme} from "../constants/Colors";
import SearchTab from "./SearchTab/SearchTab";
import ChatTab from "./ChatsTab/ChatTab";
import SettingsTab from "./SettingsTab/SettingsTab";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const TabNav = createMaterialBottomTabNavigator();


export const TabNavWrapper = () => {

    return (
        <SocketContextWrapper>
            <GlobalContext.Consumer>
                {globalState => (
                    <SocketContext.Consumer>
                        {socket => (
                            <>
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
                                        {props => <ChatTab {...props} socket={socket} globalState={globalState}/>}
                                    </TabNav.Screen>

                                    <TabNav.Screen name="Search" options={{
                                        tabBarLabel: 'Search',
                                        tabBarIcon: ({color}) => (
                                            <Ionicons name={'search'} size={26} color={color}/>
                                        ),
                                    }}>
                                        {props => <SearchTab {...props} socket={socket} globalState={globalState}/>}
                                    </TabNav.Screen>

                                    <TabNav.Screen name="Settings" options={{
                                        tabBarLabel: 'Settings',
                                        tabBarIcon: ({color}) => (
                                            <Ionicons name={'settings'} size={26} color={color}/>
                                        ),
                                    }}>
                                        {props => <SettingsTab {...props} {...socket} {...globalState}/>}
                                    </TabNav.Screen>


                                </TabNav.Navigator>

                            </>

                        )}

                    </SocketContext.Consumer>
                )}
            </GlobalContext.Consumer>
        </SocketContextWrapper>

    )
}
