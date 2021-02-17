import {ActivityIndicator} from "react-native-paper";
import React, {useContext, useEffect, useRef, useState} from "react";
import RecordButton from "../../atoms/RecordButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../constants/Colors";
import {sendNewMessageAndCreateChatAPI} from "../../../api/messaging/sendNewMessageAndCreateChatAPI";
import {SocketContext} from "../../atoms/SocketContext";
import IconButton from "react-native-paper/src/components/IconButton";

const StartFreeChat = ({mainNav, username}) => {
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
        if (_isMounted) {
            setVoiceClip(voiceClip)
        }
    }
    const submit = () => {

        if (_isMounted) setLoading(true)
        sendNewMessageAndCreateChatAPI(context.socket, {to: username, soundBits: voiceClip}).then(r => {
            if (r) {
                mainNav.push('ChatScreen', {
                    chatId: r
                })
            }
            if (_isMounted) setLoading(false)
        }).catch(e => setLoading(false))
    }

    const cancel = () => {
        if (_isMounted) setVoiceClip(null)
    }


    return (

        loading ? <ActivityIndicator animating={true} color={colorScheme.accent}/> : <>
            <RecordButton returnSeconds={(e) => console.log(e)} returnData={returnData}>

                <Ionicons size={30} name={'mic-circle-outline'}/>


            </RecordButton>
            {
                voiceClip !== null ? <>
                        <IconButton
                            icon={props => <Ionicons {...props} name={'close-circle'}/>}
                            size={30}
                            onPress={() => cancel()}
                        />
                        <IconButton
                            icon={props => <Ionicons {...props} name={'checkmark-circle'}/>}
                            size={30}
                            onPress={() => submit()}
                        />
                    </>
                    :
                    null
            }
        </>
    )
}
export default StartFreeChat
