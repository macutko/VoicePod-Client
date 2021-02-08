import {TouchableOpacity} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {Audio} from 'expo-av';

export const RecordButton = ({disabled = false, children, returnData, returnSeconds, limit}) => {
    const [recording, setRecording] = useState();
    const [seconds, setSeconds] = useState(0);
    const _isMounted = useRef(true);


    useEffect(() => {
        let interval = null;
        if (recording) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else {
            setSeconds(0);
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [recording])

    useEffect(() => {
        returnSeconds(seconds)
        if (!!limit && seconds > limit) {
            stopRecording().then(r => console.log(r)).catch(e => console.log(e))
        }
    }, [seconds])

    useEffect(() => {
        return () => { // ComponentWillUnmount in Class Component
            _isMounted.current = false;
            if (recording) recording.stopAndUnloadAsync();
        }
    }, []);

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            let recording = new Audio.Recording();
            await recording.prepareToRecordAsync({
                ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY, android: {
                    extension: '.m4a',
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                },
                ios: {
                    extension: '.m4a',
                    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
                },
            });
            await recording.startAsync();
            if (_isMounted) {
                setRecording(recording);
            }
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        if (_isMounted) {
            setRecording(undefined);
        }
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording stopped and stored at', uri);
        }
    }


    return (
        <>
            <TouchableOpacity disabled={disabled} onPressIn={startRecording} onPressOut={stopRecording}>
                {children}
            </TouchableOpacity>
        </>

    )
}
export default RecordButton
