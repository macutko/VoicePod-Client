import React from "react";
import {Image, PermissionsAndroid, StyleSheet, TouchableOpacity, View} from "react-native";
import AudioRecord from "react-native-audio-record";
import * as RNFS from "react-native-fs";
import {Appbar, Text} from "react-native-paper";
import AudioPlayer from "./AudioPlayer";
import {colorScheme} from "../../constants/Colors";
import {recordingSettings} from "../../constants/Config";


export default class OfferTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voiceClip: null,
            recording: false,
            pathToFile: null,
            counter: 0,
            timer: null,
        };
    }

    async componentDidMount() {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        AudioRecord.init({
            ...recordingSettings,
            wavFile: `${this.props.current}.wav`,
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    tick = () => {
        if (this.state.counter >= 60) {
            this.record();
        } else {
            this.setState({
                counter: this.state.counter + 1,
            });
        }
    };

    record = () => {
        if (!this.state.recording) {
            // start recording
            let timer = setInterval(this.tick, 1000);
            this.setState(
                {
                    recording: true,
                    timer: timer,
                },
                () => AudioRecord.start()
            );
        } else {
            // stop recording
            AudioRecord.stop().then((r) => {
                clearInterval(this.state.timer);
                RNFS.readFile(r, "base64").then((data) => {
                    this.setState({
                        voiceClip: data,
                        recording: false,
                        pathToFile: r,
                        counter: 0,
                    });
                });
            });
        }
    };

    render() {
        return (
            <>
                <Appbar.Header statusBarHeight={0}>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.goBack(null)}
                    />
                    <Appbar.Content
                        title={this.props.title}
                        //   subtitle={""}
                    />
                    {this.state.voiceClip && (
                        <Appbar.Action
                            icon="arrow-right"
                            onPress={() => this.props.submit(this.state.voiceClip)}
                        />
                    )}
                </Appbar.Header>

                <View style={styles.container}>
                    {this.props.children}

                    <TouchableOpacity onPress={() => this.record()}>
                        <Image
                            style={styles.mic}
                            source={require("../../assets/images/mic.png")}
                        />
                    </TouchableOpacity>

                    <Text style={styles.counter}>{this.state.counter}</Text>
                    {!this.state.voiceClip ? (
                        <Text style={styles.description}>{this.props.description}</Text>
                    ) : (
                        <AudioPlayer
                            style={styles.player}
                            pathToSound={this.state.pathToFile}
                            width={"60%"}
                        />
                    )}
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.white,
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    mic: {
        width: 60,
        height: 140,
        resizeMode: "contain",
    },
    counter: {
        color: colorScheme.secondary,
        fontWeight: "bold",
        fontSize: 25,
    },
    description: {
        fontSize: 13,
        lineHeight: 50,
    },
});
