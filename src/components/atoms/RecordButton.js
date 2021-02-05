import {TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import AudioRecord from "react-native-audio-record";
import * as RNFS from "react-native-fs";
import getRecordPermissions from "../../utilities/PermissionUtils";
import {Button, Dialog, Paragraph, Portal} from "react-native-paper";

export const RecordButton = ({disabled = false, children, returnData, returnSeconds, limit}) => {

    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [warning, setWarning] = useState(false)

    const getPerm = () => {
        getRecordPermissions().then(res => {
            if (!res) setWarning(true)
            else setWarning(false)
        }).catch(e => console.log(e))
    }

    getPerm()

    useEffect(() => {
        returnSeconds(seconds)
        if (!!limit && seconds > limit) {
            setIsRecording(false)
        }
    }, [seconds])

    useEffect(() => {
        let interval = null;
        if (isRecording) {
            returnData({
                voiceClip: null,
                pathToFile: null
            })
            AudioRecord.start()
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else {
            AudioRecord.stop().then((r) => {
                RNFS.readFile(r, "base64").then((data) => {
                    returnData({
                        voiceClip: data,
                        pathToFile: r
                    })
                });
            }).catch(e => console.log(`fail ${e}`));
            setSeconds(0);
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };

    }, [isRecording]);

    return (
        <>
            <TouchableOpacity disabled={disabled} onPress={() => setIsRecording(!isRecording)}>
                {children}
            </TouchableOpacity>

            <Portal>
                <Dialog visible={warning} onDismiss={() => setWarning(false)}>
                    <Dialog.Title>Recording permissions</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>We need recording permissions to be able to use your microphone</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => getPerm()}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>

    )
}
export default RecordButton
