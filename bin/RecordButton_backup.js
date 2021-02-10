import {TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {FileSystem} from 'react-native-unimodules';
import {Button, Dialog, Paragraph, Portal} from "react-native-paper";
import {Audio} from 'expo-av';

export const RecordButton = ({disabled = false, children, returnData, returnSeconds, limit, fileName = 'example.wav'}) => {

    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [warning, setWarning] = useState(false)

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

                FileSystem.readAsStringAsync(`file://${r}`, {encoding: FileSystem.EncodingType.Base64}).then((data) => {
                    returnData({
                        voiceClip: data,
                        pathToFile: r
                    })
                }).catch(e => (console.log(e)))

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
                        <Button onPress={() => Audio.requestPermissionsAsync()}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>

    )
}
export default RecordButton
