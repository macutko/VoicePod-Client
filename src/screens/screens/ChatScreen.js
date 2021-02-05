import React, {useEffect, useRef, useState} from "react";
import ChatHeader from "../../components/organisms/ChatScreen/ChatHeader";
import {getOtherPartyDetailsByChatIdAPI} from "../../api/chat/getOtherPartyDetailsByChatIdAPI";
import ChatBody from "../../components/organisms/ChatScreen/ChatBody";

const ChatScreen = (props) => {
    const _isMounted = useRef(true);
    const [isFetching, setIsFetching] = useState(true)
    const [otherChatParty, setOtherChatParty] = useState({})

    useEffect(() => {
        getOtherPartyDetailsByChatIdAPI(props.socket, {chatId: props.route.params.chatId}).then(res => {
            if (_isMounted) {
                setIsFetching(false)
                setOtherChatParty(res)
            }
        }).catch(e => {
            if (_isMounted) {
                setIsFetching(false)
                setOtherChatParty({})

            }
            console.log(e)
        })

        return () => {
            _isMounted.current = false;
        }
    }, []);

    return (
        <>
            {!isFetching ? <>
                <ChatHeader navigation={props.navigation}
                            data={otherChatParty} chatId={props.route.params.chatId}/>

                <ChatBody chatId={props.route.params.chatId}/>
            </> : null}

        </>
    )

}
export default ChatScreen

