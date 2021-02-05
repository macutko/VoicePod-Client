import React, {useContext, useState} from "react";
import {SocketContext} from "../../atoms/SocketContext";
import Message from "../../molecules/ChatScreen/Message";
import {StyleSheet, View} from "react-native";
import {getMessagesByChatIdAPI} from "../../../api/chat/getMessagesByChatIdAPI";
import ItemListHOC from "../../atoms/ItemListHOC";
import {joinChatAPI} from "../../../api/chat/joinChatAPI";
import CreateNewMessageButton from "../../molecules/ChatScreen/CreateNewMessageButton";
import SubmitNewMessageButton from "../../molecules/ChatScreen/SubmitNewMessageButton";

const ChatBody = ({chatId}) => {
    const context = useContext(SocketContext)
    const [newMessage, setNewMessage] = useState(null)

    joinChatAPI(context.socket, {chatId: chatId}).then().catch(e => console.log(e))

    const returnNewMessage = (soundBits) => {
        setNewMessage(soundBits)
    }

    return (<>
            <View style={{flexDirection: "column"}}>
                {/*TODO: onNewMessage event!*/}
                <ItemListHOC api={getMessagesByChatIdAPI} apiProps={{socket: context.socket, data: {chatId: chatId}}}
                             listItem={Message} style={styles.messagesContainer}/>

            </View>

            <View style={styles.bottom_container}>

                {newMessage === null ?
                    <CreateNewMessageButton chatId={chatId} returnNewMessage={returnNewMessage}/> :
                    <SubmitNewMessageButton newMessageSound={newMessage} setNewMessage={setNewMessage}
                                            chatId={chatId}/>}
            </View>
        </>
    )
}

export default ChatBody

const styles = StyleSheet.create({
    bottom_container: {
        alignItems: "center",
        height: "20%",
    },
    messagesContainer: {
        height: "80%",
    },
});
