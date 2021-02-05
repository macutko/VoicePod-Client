import {TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import AudioRecord from "react-native-audio-record";
import * as RNFS from "react-native-fs";

export const RecordButton = ({children, returnData, returnSeconds, limit}) => {

    const [isRecording, setIsRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);

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
        <TouchableOpacity onPress={() => setIsRecording(!isRecording)}>
            {children}
        </TouchableOpacity>

    )
}
export default RecordButton
