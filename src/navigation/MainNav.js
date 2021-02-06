import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native-web";
import {horizontalAnimation} from "../utilities/AnimationUtils";
import GlobalContext from "../components/atoms/GlobalState";
import ChatScreen from "../screens/screens/ChatScreen";
import ViewChatOfferScreen from "../screens/screens/ViewChatOfferScreen";
import SetBudgetCreateOfferScreen from "../screens/screens/SetBudgetCreateOfferScreen";
import IntroCreateOfferScreen from "../screens/screens/IntroCreateOfferScreen";
import ProblemCreateOfferScreen from "../screens/screens/ProblemCreateOfferScreen";
import OfferScreen from "../screens/screens/OfferScreen";
import {TabNav} from "./TabNav";
import LeaveReviewScreen from "../screens/screens/LeaveReviewScreen";
import SocketContextWrapper from "../components/molecules/SocketContextWrapper";
import {SocketContext} from "../components/atoms/SocketContext"

export const navigationRef = React.createRef();
const MainStack = createStackNavigator();


export const MainNav = () => {
    return (
        <SocketContextWrapper>
            <GlobalContext.Consumer>
                {globalState => (
                    <SocketContext.Consumer>
                        {socket => (
                            <NavigationContainer ref={navigationRef}>
                                <StatusBar hidden={true} translucent backgroundColor='transparent'/>
                                <MainStack.Navigator screenOptions={{headerShown: false}}>
                                    <MainStack.Screen name="TabNavWrapper">
                                        {props => <TabNav {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    {/* OfferScreen */}
                                    <MainStack.Screen name="IntroCreateOfferScreen" options={horizontalAnimation}>
                                        {props => <IntroCreateOfferScreen {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="ProblemCreateOfferScreen" options={horizontalAnimation}>
                                        {props => <ProblemCreateOfferScreen  {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="SetBudgetCreateOfferScreen" options={horizontalAnimation}>
                                        {props => <SetBudgetCreateOfferScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    {/* Chat */}
                                    <MainStack.Screen name="ChatScreen">
                                        {props => <ChatScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="OfferScreen">
                                        {props => <OfferScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    {/* Chat Menu */}
                                    <MainStack.Screen name="ViewChatOfferScreen" options={horizontalAnimation}>
                                        {props => <ViewChatOfferScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="LeaveReviewScreen">
                                        {props => <LeaveReviewScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    {/* here will go other chat menu screens (Settings, Search, Block...) */}
                                </MainStack.Navigator>
                            </NavigationContainer>
                        )}

                    </SocketContext.Consumer>
                )}
            </GlobalContext.Consumer>
        </SocketContextWrapper>

    )
}
