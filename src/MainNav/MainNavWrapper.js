import React from "react"
import SocketContextWrapper, {SocketContext} from "./SocketContextWrapper";
import GlobalContext from "../GlobalState";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native-web";
import IntroOffer from "./OfferScreen/IntroOffer";
import ProblemOffer from "./OfferScreen/ProblemOffer";
import AdviceOffer from "./OfferScreen/AdviceOffer";
import OutcomeOffer from "./OfferScreen/OutcomeOffer";
import BudgetOffer from "./OfferScreen/BudgetOffer";
import {createStackNavigator} from "@react-navigation/stack";
import ChatScreen from "./ChatsTab/Chat/ChatScreen";
import {TabNavWrapper} from "./TabNavWrapper";
import OfferScreen from "./OffersTab/Offer/OfferScreen";

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
                                    <MainStack.Screen name="LandingPage">
                                        {props => <TabNavWrapper {...globalState} {...socket} {...props} />}
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
                                    <MainStack.Screen name="OfferScreen">
                                        {props => <OfferScreen  {...globalState} {...socket} {...props}/>}
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
