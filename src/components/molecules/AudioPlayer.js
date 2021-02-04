import {IconButton} from "react-native-paper";
import React from "react";
import Sound from "react-native-sound";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet, View} from "react-native";
import * as RNFS from "react-native-fs";
import Slider from "@react-native-community/slider";
import {colorScheme} from "../../constants/Colors";

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            duration: 0,
            sound: null,
            currentTime: 0,
        };
    }

    componentWillUnmount() {
        if (this.state.sound) {
            this.state.sound.release();
        }
        clearInterval(this.state.timer);
    }

    async componentDidMount() {
        await this.loadSound();
    }

    loadSound = async () => {
        let path;

        if (this.props.soundBits) {
            path = RNFS.DocumentDirectoryPath + `${this.props.pathToSound}.wav`;
            await RNFS.writeFile(path, this.props.soundBits, "base64");
        } else if (this.props.pathToSound) {
            path = this.props.pathToSound;
        }

        Sound.setCategory("Playback");

        let s = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log("failed to load the sound", error);
                return;
            }
            this.setState({
                sound: s,
                duration: s.getDuration(),
            });
        });
    };

    tick = () => {
        this.state.sound.getCurrentTime((seconds) => {
            this.setState({
                currentTime: seconds,
            });
        });
    };

    playSound = async () => {
        if (!this.state.playing) {
            this.setState(
                {
                    playing: true,
                    timer: setInterval(() => {
                        this.tick();
                    }, 50),
                },
                () => {
                    this.state.sound.setCurrentTime(this.state.currentTime);

                    this.state.sound.play((success) => {
                        if (success) {
                            clearInterval(this.state.timer);

                            this.setState(
                                {
                                    playing: false,
                                    timer: null,
                                },
                                () => console.log("successfully finished playing")
                            );
                        } else {
                            clearInterval(this.state.timer);
                            this.setState({
                                timer: null,
                            });
                            console.log("playback failed due to audio decoding errors");
                        }
                    });
                }
            );
        }
    };

    seek = (e) => {
        if (this.state.playing) {
            this.setState(
                {
                    playing: false,
                    currentTime: e,
                },
                () => this.state.sound.pause()
            );
        } else {
            this.setState({
                currentTime: e,
            });
        }
    };

    render() {
        return (
            <View style={this.props.style}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>

                        <IconButton
                            style={styles.button}
                            icon={(props) => (
                                <Ionicons
                                    {...props}
                                    name={"play"}
                                    color={colorScheme.secondary}
                                />
                            )}
                            onPress={() => this.playSound()}
                        />

                        <Slider
                            style={[styles.slider, {width: this.props.width}]}
                            minimumValue={0}
                            maximumValue={this.state.duration}
                            value={this.state.currentTime}
                            onValueChange={this.seek}
                            minimumTrackTintColor={colorScheme.background}
                            thumbTintColor={colorScheme.secondary}
                            maximumTrackTintColor={colorScheme.white}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    slider: {
        height: 50,
        width: "50%",
        flexGrow: 1,
    },
    button: {
        alignSelf: "center",
        color: colorScheme.secondary,
    },
    mainContainer: {
        alignContent: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        backgroundColor: colorScheme.black,
        borderRadius: 15,
    },
    container: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
});
