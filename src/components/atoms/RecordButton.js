import {TouchableOpacity} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {Audio} from 'expo-av';

export const RecordButton = ({disabled = false, children, returnData, returnSeconds, limit, fileName = 'example.wav'}) => {

    const [seconds, setSeconds] = useState(0);
    const _isMounted = useRef(true);
    const [recording, setRecording] = useState();

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
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
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
