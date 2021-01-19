import {IconButton} from "react-native-paper";
import React from "react";
import Sound from "react-native-sound";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet, View} from "react-native";
import * as RNFS from "react-native-fs";
import Slider from "@react-native-community/slider";
import {colorScheme} from "./constants/Colors";

export default class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            duration: 0,
            sound: null,
            start: 0
        }
    }

    componentWillUnmount() {
        this.state.sound.release();
    }

    async componentDidMount() {
        await this.loadSound()
    }

    loadSound = async () => {

        let path

        if (this.props.soundBits) {
            path = RNFS.DocumentDirectoryPath + `${this.props.pathToSound}.wav`;
            await RNFS.writeFile(path, this.props.soundBits, 'base64')
        } else if (this.props.pathToSound) {
            path = this.props.pathToSound
        }

        Sound.setCategory('Playback');

        let s = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            this.setState({
                sound: s,
                duration: s.getDuration()
            })
        })
    }


    playSound = async () => {
        if (!this.state.playing) {
            this.setState({
                playing: true
            }, () => {
                this.state.sound.setCurrentTime(this.state.start)
                this.state.sound.getCurrentTime((seconds) => console.log('at ' + seconds))
                this.state.sound.play((success) => {
                    if (success) {
                        this.setState({
                                playing: false
                            }, () => console.log('successfully finished playing')
                        )
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });

            })
        }
    }

    seek = (e) => {
        // TODO: finish seeking and playback timer to indicate current position https://github.com/zmxv/react-native-sound/issues/235
        if (this.state.playing) {
            this.setState({
                playing: false,
                start: e
            }, () => this.state.sound.pause())

        }
    }

    render() {
        return (
            <View style={this.props.style}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <IconButton
                            style={styles.button}
                            icon={props => <Ionicons {...props} name={'play'}/>}
                            // size={20}
                            onPress={() => this.playSound()}/>

                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={this.state.duration}
                            value={this.state.start}
                            onValueChange={this.seek}
                            minimumTrackTintColor={colorScheme.background}
                            maximumTrackTintColor={colorScheme.accent}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    slider: {
        height: 65,
        // width: "90%",
        flexGrow: 1
    },
    button: {
        alignSelf: "center",
        // width: "10%",
        // paddingLeft: 15,
    },
    mainContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
})