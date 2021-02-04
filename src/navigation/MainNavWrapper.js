import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StatusBar} from "react-native-web";
import {horizontalAnimation} from "../utilities/AnimationUtils";
import GlobalContext from "../components/atoms/GlobalState";
import ChatScreen from "../screens/ChatScreen";
import ViewOffer from "../___________MainNav/ChatsTab/Menu/ViewOffer";
import BudgetOffer from "../___________MainNav/CreateOfferScreen/BudgetOffer";
import IntroOffer from "../___________MainNav/CreateOfferScreen/IntroOffer";
import ProblemOffer from "../___________MainNav/CreateOfferScreen/ProblemOffer";
import OfferScreen from "../___________MainNav/OffersTab/Offer/OfferScreen";
import SocketContextWrapper from "../components/molecules/SocketContextWrapper";

import {TabNavWrapper} from "./TabNavWrapper";
import LeaveReview from "../___________MainNav/LeaveReview/LeaveReview";
import { SocketContext } from "../components/atoms/SocketContext";

export const navigationRef = React.createRef();
const MainStack = createStackNavigator();



export const MainNavWrapper = () => {
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
                                        {props => <TabNavWrapper {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    {/* OfferScreen */}
                                    <MainStack.Screen name="IntroOffer" options={horizontalAnimation}>
                                        {props => <IntroOffer {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="ProblemOffer" options={horizontalAnimation}>
                                        {props => <ProblemOffer  {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="BudgetOffer" options={horizontalAnimation}>
                                        {props => <BudgetOffer  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    {/* Chat */}
                                    <MainStack.Screen name="ChatScreen">
                                        {props => <ChatScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="OfferScreen">
                                        {props => <OfferScreen  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    {/* Chat Menu */}
                                    <MainStack.Screen name="ViewOffer" options={horizontalAnimation}>
                                        {props => <ViewOffer  {...globalState} {...socket} {...props}/>}
                                    </MainStack.Screen>
                                    <MainStack.Screen name="LeaveReview">
                                        {props => <LeaveReview  {...globalState} {...socket} {...props}/>}
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
