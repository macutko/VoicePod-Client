import React from "react"
import SocketContextWrapper, {SocketContext} from "../SocketContextWrapper";
import {createStackNavigator} from "@react-navigation/stack";
import ChatList from "./Chat.list";
import GlobalContext from "../../GlobalState";
import ChatScreen from "../ChatScreen/ChatScreen";

const ChatStack = createStackNavigator();

export default function ChatsAndMessagesWrapper() {
    return (

        <SocketContextWrapper>
            <GlobalContext.Consumer>
                {globalState => (
                    <SocketContext.Consumer>
                        {socket => (
                            <>
                                <ChatStack.Navigator screenOptions={{headerShown: false}}>

                                    <ChatStack.Screen name="MessagesList">
                                        {props => <ChatList {...props} socket={socket} globalState={globalState}/>}
                                    </ChatStack.Screen>
                                    <ChatStack.Screen name="ChatScreen">
                                        {props => <ChatScreen {...props} socket={socket} globalState={globalState}/>}
                                    </ChatStack.Screen>

                                </ChatStack.Navigator>
                            </>
                        )}

                    </SocketContext.Consumer>
                )}
            </GlobalContext.Consumer>
        </SocketContextWrapper>

    )
}
