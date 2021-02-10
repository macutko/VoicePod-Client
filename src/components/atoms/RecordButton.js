import React from "react";
import {Audio} from 'expo-av';
import {TouchableOpacity} from "react-native";
import {Title} from "react-native-paper";
import {FileSystem} from "react-native-unimodules";
import PropTypes from 'prop-types';


class RecordButton extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false
        this.state = {
            permissionsGranted: false
        }
        this.recording = null
    }

    onRecordingUpdate = (status) => {
        let seconds = Math.round(status.durationMillis / 1000)
        console.log(`Seconds: ${seconds}`)
        this.props.returnSeconds(seconds)
        if (!status.isDoneRecording && status.isRecording && seconds >= this.props.limit) this.stopRecording()
    }

    startRecording = () => {
        this.props.returnData({
            voiceClip: null,
            pathToFile: null
        })
        this.recording = new Audio.Recording();
        this.recording.prepareToRecordAsync({
            ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY, android: {
                extension: '.m4a',
                outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            },
            ios: {
                extension: '.m4a',
                outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
            },
        }).then(r => {
            if (r.canRecord) {
                this.recording.setOnRecordingStatusUpdate(this.onRecordingUpdate)
                this.recording.setProgressUpdateInterval(1000)
                this.recording.startAsync().then(r => console.log(`Started ${JSON.stringify(r)}`)).catch(e => console.log(e));
            }
        }).catch(e => console.log(e));
    }

    stopRecording = () => {
        if (this.recording !== null) {
            this.recording.stopAndUnloadAsync().then(r => {
                console.log(`Stopped ${JSON.stringify(r)}`)
                let uri = this.recording.getURI()
                this.recording = null
                console.log(uri)
                FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64}).then((data) => {
                    this.props.returnData({
                        voiceClip: data,
                        pathToFile: uri
                    })
                }).catch(e => (console.log(`Error on read file ${e}`)))


            }).catch(e => {
                console.log(`Error on stop ${e}`)
                this.recording = null
            });
        }
    }


    componentDidMount() {
        this._isMounted = true
        Audio.requestPermissionsAsync().then(r => {
            if (r.status === "granted" && this._isMounted) {
                this.setState({
                    permissionsGranted: true
                })
            }
        }).catch(e => console.log(e));

        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        }).then(r => console.log(`Set audio mode ${r}`)).catch(e => console.log(e));

    }

    componentWillUnmount() {
        this._isMounted = false
        if (this.recording !== null) {
            this.recording.stopAndUnloadAsync().then(r => console.log(`Stop and unload unount ${r}`)).catch(e => console.log(e))
            this.recording = null
        }
    }

    render() {
        return (

            this.state.permissionsGranted ?
                <TouchableOpacity disabled={this.props.disabled} onPressIn={this.startRecording}
                                  onPressOut={this.stopRecording}>
                    {this.props.children}
                </TouchableOpacity> :

                // TODO: UI Make this nicer
                <Title> We need microphone permissions for you to be able to record messages</Title>

        )
    }
}

export default RecordButton

RecordButton.propTypes = {
    disabled: PropTypes.bool,
    returnSeconds: PropTypes.func,
    returnData: PropTypes.func,
    limit: PropTypes.number
};
