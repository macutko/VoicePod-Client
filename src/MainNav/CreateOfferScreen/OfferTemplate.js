import React from "react";
import {Button} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {PermissionsAndroid, StyleSheet, View} from "react-native";
import Text from "react-native-paper/src/components/Typography/Text";
import AudioRecord from 'react-native-audio-record';
import AudioPlayer from "../../components/AudioPlayer";
import IconButton from "react-native-paper/src/components/IconButton";
import * as RNFS from "react-native-fs";
import {colorScheme} from "../../components/constants/Colors";

const options = {
    sampleRate: 16000,  // default 44100
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only
    // wavFile: 'test.wav' // default 'audio.wav'
};

export default class OfferTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            voiceClip: null,
            recording: false,
            pathToFile: null,
            counter: 0,
            timer: null
        }
    }

    async componentDidMount() {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        AudioRecord.init({...options, wavFile: `${this.props.current}.wav`})
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    tick = () => {
        if (this.state.counter >= 60) {
            this.record()
        } else {
            this.setState({
                counter: this.state.counter + 1
            });
        }
    }

    record = () => {
        if (!this.state.recording) {
            // start recording
            let timer = setInterval(this.tick, 1000);
            this.setState({
                recording: true,
                timer: timer
            }, () => AudioRecord.start())
        } else {
            // stop recording
            AudioRecord.stop().then(r => {
                console.log(r)
                clearInterval(this.state.timer)
                RNFS.readFile(r, 'base64')
                    .then((data) => {
                        this.setState({
                            voiceClip: data,
                            recording: false,
                            pathToFile: r,
                            counter: 0
                        })
                    })
            })
        }
    }


    submit = () => {
        this.props.navigation.navigate('ProblemOffer', {who: this.state.voiceClip})
    }

    render() {
        return (
            <View style={styles.background}>
                {this.props.topPart}


                <IconButton
                    icon={props => <Ionicons {...props} name={'mic'}/>}
                    color={colorScheme.accent}
                    size={40}
                    onPress={() => this.record()}
                />


                <Text style={styles.counter}>{this.state.counter}</Text>

                {this.props.bottomPart ? this.props.bottomPart :
                    <Text style={styles.description}>When you are ready, press the microphone and
                        start talking. You will
                        have 1 minute.</Text>}

                {this.state.voiceClip == null || this.state.recording ? null :
                    <AudioPlayer style={styles.player} pathToSound={this.state.pathToFile}/>}

                <Button mode="contained"
                        labelStyle={styles.buttonStyle_label}
                        icon={props => <Ionicons {...props} name={'send'}/>}
                        disabled={this.state.voiceClip == null || this.state.recording}
                        onPress={() => this.props.submit(this.state.voiceClip)}
                        style={this.state.voiceClip == null || this.state.recording ? styles.buttonStyle_disabled : styles.buttonStyle}>
                    Next
                </Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    counter: {
        color: colorScheme.error
    },
    player: {
        marginTop: 20
    },
    background: {
        backgroundColor: colorScheme.primary,
        height: "100%",
        alignItems: "center",
        paddingTop: "10%",
        // justifyContent: "center",
    },
    buttonStyle_label: {color: colorScheme.neutral,},
    buttonStyle_disabled: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: 10,
        backgroundColor: colorScheme.neutral_subtle,
        width: "80%"
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: 10,
        backgroundColor: colorScheme.secondary,
        width: "80%"
    },
    description: {
        paddingTop: 10,
        fontSize: 15,
        fontStyle: 'italic',
        color: colorScheme.neutral_subtle,
        width: "80%",
        textAlign: 'justify'
    },

});
