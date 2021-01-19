import React from "react"
import SocketContextWrapper, {SocketContext} from "./SocketContextWrapper";
import GlobalContext from "../GlobalState";
import SearchTab from "./SearchTab/SearchTab";
import ChatsTab from "./ChatsTab/ChatsTab";
import SettingsTab from "./SettingsTab/SettingsTab";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native-web";
import IntroOffer from "../OfferScreen/IntroOffer";
import ProblemOffer from "../OfferScreen/ProblemOffer";
import AdviceOffer from "../OfferScreen/AdviceOffer";
import OutcomeOffer from "../OfferScreen/OutcomeOffer";
import BudgetOffer from "../OfferScreen/BudgetOffer";
import {createStackNavigator} from "@react-navigation/stack";
import {colorScheme} from "../components/constants/Colors";
import ChatScreen from "./ChatsTab/Chat/ChatScreen";

export const navigationRef = React.createRef();
const MainStack = createStackNavigator();

const TabNav = createMaterialBottomTabNavigator();


const TabNavPage = (inheritance) => {
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


export const LandingPage = () => {
    return (
        <SocketContextWrapper>
            <GlobalContext.Consumer>
                {globalState => (
                    <SocketContext.Consumer>
                        {socket => (
                            <NavigationContainer ref={navigationRef}>
                                <StatusBar hidden={true} translucent backgroundColor='transparent'/>
                                <MainStack.Navigator screenOptions={{headerShown: false}}>
                                    <MainStack.Screen name="LandingPage">
                                        {props => <TabNavPage {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="IntroOffer">
                                        {props => <IntroOffer {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="ProblemOffer">
                                        {props => <ProblemOffer  {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="AdviceOffer">
                                        {props => <AdviceOffer {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="OutcomeOffer">
                                        {props => <OutcomeOffer {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="BudgetOffer">
                                        {props => <BudgetOffer  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="Chat">
                                        {props => <ChatScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                </MainStack.Navigator>
                            </NavigationContainer>
                        )}

                    </SocketContext.Consumer>
                )}
            </GlobalContext.Consumer>
        </SocketContextWrapper>

    )
}
