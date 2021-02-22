import {Appbar} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, {useContext, useState} from "react";
import InChatMenu from "../../molecules/ChatScreen/InChatMenu";
import {SocketContext} from "../../atoms/SocketContext";
import {setCloseChatAPI} from "../../../api/chat/setCloseChatAPI";

export const ChatHeader = ({navigation, data, chatId}) => {
    const context = useContext(SocketContext)
    const [menuVisible, setMenuVisible] = useState(false)

    const closeChat = () => {
        setCloseChatAPI(context.socket, {chatId: chatId}).then(res => {
            if (res) {
                navigation.navigate('LeaveReview', {chatId: chatId})
            }
            console.log(`Res ${res}`);
        }).catch(e => console.log(e))
    }

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => navigation.goBack(null)}
                />
                <Appbar.Content
                    title={
                        data.firstName +
                        " " +
                        data.lastName
                    }
                />
                <Appbar.Action
                    icon={(props) => (
                        <Ionicons {...props} name={"checkmark-circle"}/>
                    )}
                    onPress={() => {
                        closeChat();
                    }}
                />
                <Appbar.Action
                    icon="dots-vertical"
                    onPress={() => {
                        setMenuVisible(!menuVisible);
                    }}
                />

            </Appbar.Header>

            <InChatMenu isVisible={menuVisible} toggleMenu={() => setMenuVisible(!menuVisible)} closeChat={closeChat}
                        navigation={navigation} chatId={chatId}/>
        </>
    )
}
export default ChatHeader
