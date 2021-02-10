import {ActivityIndicator, IconButton} from "react-native-paper";
import React, {useContext, useEffect, useRef, useState} from "react";
import RecordButton from "../../atoms/RecordButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../constants/Colors";
import {sendNewMessageAndCreateChatAPI} from "../../../api/messaging/sendNewMessageAndCreateChatAPI";
import {SocketContext} from "../../atoms/SocketContext";

const StartFreeChat = ({navigation, username}) => {
    const [voiceClip, setVoiceClip] = useState(null)
    const [loading, setLoading] = useState(false)
    const _isMounted = useRef(true);
    const context = useContext(SocketContext)
    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    const returnData = ({pathToFile, voiceClip}) => {
        if (_isMounted.current) setVoiceClip(voiceClip)
    }
    const submit = () => {
        if (_isMounted.current) setLoading(true)
        sendNewMessageAndCreateChatAPI(context.socket, {to: username, soundBits: voiceClip}).then(r => {
            if (r) {
                navigation.navigate('ChatsTab', {screen: "StandardChats"})
            }
            if (_isMounted.current) setLoading(false)
        }).catch(e => console.log(e))
    }
    const cancel = () => {
        if (_isMounted.current) setVoiceClip(null)
    }


    return (

        loading ? <ActivityIndicator animating={true} color={colorScheme.accent}/> :
            <RecordButton returnSeconds={(e) => console.log(e)} returnData={returnData}>


                {voiceClip === null ?
                    <Ionicons size={30} name={'mic-circle-outline'}/>
                    :
                    <>
                        <IconButton
                            icon={props => <Ionicons {...props} name={'close-circle'}/>}
                            color={colorScheme.background_subtle}
                            onPress={() => cancel()}
                        />
                        <IconButton
                            icon={props => <Ionicons {...props} name={'checkmark-circle'}/>}
                            color={colorScheme.background_subtle}
                            onPress={() => submit()}
                        />
                    </>}
            </RecordButton>

    )
}
export default StartFreeChat
