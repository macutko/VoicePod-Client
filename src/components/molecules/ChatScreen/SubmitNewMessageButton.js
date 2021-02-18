import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import IconButton from "react-native-paper/src/components/IconButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../constants/Colors";
import {sendNewMessageAPI} from "../../../api/messaging/sendNewMessageAPI";
import {SocketContext} from "../../atoms/SocketContext";
import AudioPlayer from "../../atoms/AudioPlayer";

const SubmitNewMessageButton = ({newMessageSound, setNewMessage, chatId}) => {
    const context = useContext(SocketContext)

    const cancel = () => {
        setNewMessage(null)
    }
    const submit = () => {
        console.log('here')
        sendNewMessageAPI(context.socket, {chatId: chatId, voiceClip: newMessageSound}).then(r => {
            setNewMessage(null)
        }).catch(e => console.log(e))
    }
    return (

        <View style={styles.playContainer}>
            <View style={styles.playContainer_inside}>
                <IconButton
                    icon={props => <Ionicons {...props} name={'close-circle'}/>}
                    color={colorScheme.background_subtle}
                    // size={20}
                    style={styles.cancelButton}
                    onPress={() => cancel()}
                />
                <AudioPlayer style={styles.audioPlayer} soundBits={newMessageSound} fileName={'newMessage'}/>
                <IconButton
                    icon={props => <Ionicons {...props} name={'checkmark-circle'}/>}
                    color={colorScheme.background_subtle}
                    style={styles.cancelButton}
                    onPress={() => submit()}
                />
            </View>
        </View>
    )
}
export default SubmitNewMessageButton


const styles = StyleSheet.create({
    audioPlayer: {
        width: '70%'
    },
    playContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    playContainer_inside: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    cancelButton: {
        alignSelf: "center",
        backgroundColor: 'red',
        // paddingLeft: 15,
        width: "10%"
    },
})
