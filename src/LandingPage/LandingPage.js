import React from "react"
import SocketContextWrapper, {SocketContext} from "./SocketContextWrapper";
import GlobalContext from "../GlobalState";
import SearchTab from "./SearchTab/SearchTab";
import ChatTab from "./ChatsTab/ChatTab";
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
                {props => <ChatTab {...props} {...inheritance} mainNav={inheritance.navigation}/>}
            </TabNav.Screen>

            <TabNav.Screen name="Search" options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({color}) => (
                    <Ionicons name={'search'} size={26} color={color}/>
                ),
            }}>
                {props => <SearchTab {...props} {...inheritance} mainNav={inheritance.navigation}/>}
            </TabNav.Screen>

            <TabNav.Screen name="Settings" options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color}) => (
                    <Ionicons name={'settings'} size={26} color={color}/>
                ),
            }}>
                {props => <SettingsTab {...props} {...inheritance} mainNav={inheritance.navigation}/>}
            </TabNav.Screen>


        </TabNav.Navigator>
    )
}


export const LandingPage = (props) => {
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
                                        {props => <TabNavPage {...props} {...globalState} {...socket} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="IntroOffer" component={IntroOffer}/>
                                    <MainStack.Screen name="ProblemOffer" component={ProblemOffer}/>
                                    <MainStack.Screen name="AdviceOffer" component={AdviceOffer}/>
                                    <MainStack.Screen name="OutcomeOffer" component={OutcomeOffer}/>
                                    <MainStack.Screen name="BudgetOffer" component={BudgetOffer}/>
                                </MainStack.Navigator>
                            </NavigationContainer>
                        )}

                    </SocketContext.Consumer>
                )}
            </GlobalContext.Consumer>
        </SocketContextWrapper>

    )
}
