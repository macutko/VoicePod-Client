import React from "react"
import SocketContextWrapper, {SocketContext} from "./SocketContextWrapper";
import GlobalContext from "../GlobalState";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native-web";
import IntroOffer from "./CreateOfferScreen/IntroOffer";
import ProblemOffer from "./CreateOfferScreen/ProblemOffer";
import AdviceOffer from "./CreateOfferScreen/AdviceOffer";
import OutcomeOffer from "./CreateOfferScreen/OutcomeOffer";
import BudgetOffer from "./CreateOfferScreen/BudgetOffer";
import {createStackNavigator} from "@react-navigation/stack";
import ChatScreen from "./ChatsTab/Chat/ChatScreen";
import {TabNavWrapper} from "./TabNavWrapper";
import ViewOffer from "./ChatsTab/Menu/ViewOffer";
import { horizontalAnimation } from "../components/helpers/animations";
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
                                    <MainStack.Screen name="TabNavWrapper">
                                        {props => <TabNavWrapper {...globalState} {...socket} {...props} />}
                                    </MainStack.Screen>
                                    {/* OfferScreen */}
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
