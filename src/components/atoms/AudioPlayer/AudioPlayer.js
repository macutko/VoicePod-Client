import {StyleSheet, View} from "react-native";
import React from "react";
import {colorScheme} from "../../../constants/Colors";
import PlayButton from "./PlayButton";
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";
import TrackSlider from "./TrackSlider";
import PauseButton from "./PauseButton";
import {FileSystem} from "react-native-unimodules";
import {Audio} from "expo-av";

export default class AudioPlayer extends React.Component {
    constructor(props) {
        console.log(props.fileName)
        super(props);
        this.state = {
            playing: false,
            loading: true,
            position: 0,
            permissionsGranted: false
        }
        this.sound = null;
        this._isMounted = false
    }

    onSoundUpdate = (status) => {

        if (this._isMounted) {
            if (!status.isBuffering) {

                this.setState({
                    loading: false
                })
            }
            if (status.isPlaying) {
                this.setState({
                    playing: true
                })
            }
            if (!status.isPlaying) {
                this.setState({
                    playing: false
                })
            }
            this.setState({
                position: status.positionMillis
            })
        }

    }

    componentWillUnmount() {
        this._isMounted = false
        if (this.sound !== null) {
            this.sound.unloadAsync().then(r => {
                console.log(r)
                this.sound = null
            }).catch(e => console.log(e))
        }
    }

    componentDidMount() {
        this._isMounted = true
        Audio.getPermissionsAsync().then(r => {
            if (r.status !== "granted" && this._isMounted) {
                this.setState({
                    permissionsGranted: false
                })
            } else {
                if (this._isMounted) {
                    this.setState({
                        permissionsGranted: true
                    })
                }
            }
        })
        if (this.props.soundBits) {
            let path = FileSystem.documentDirectory + `${this.props.fileName}.m4a`;

            FileSystem.writeAsStringAsync(path, this.props.soundBits, {encoding: FileSystem.EncodingType.Base64}).then((data) => {
                Audio.Sound.createAsync({uri: path}).then(r => {
                    if (this._isMounted) {
                        this.sound = r.sound
                        this.sound.setProgressUpdateIntervalAsync(100).then(r => {
                        }).catch(e => console.log(e))
                        this.sound.setOnPlaybackStatusUpdate(this.onSoundUpdate)
                    }
                }).catch(e => console.log(e))
            }).catch(e => (console.log(e)))

        } else if (this.props.pathToSound) {
            Audio.Sound.createAsync({uri: this.props.pathToSound}).then(r => {
                if (this._isMounted) {
                    this.sound = r.sound
                    this.sound.setProgressUpdateIntervalAsync(100).then().catch(e => console.log(e))
                    this.sound.setOnPlaybackStatusUpdate(this.onSoundUpdate)
                }
            }).catch(e => console.log(`Error on reading audio ${e}`))

        }
    }


    render() {
        return (
            <View style={this.props.style}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        {this.state.loading || !this.state.permissionsGranted ?
                            <ActivityIndicator animating={true} color={colorScheme.accent}/> :
                            <>
                                {this.state.playing ? <PauseButton sound={this.sound}/> :
                                    <PlayButton sound={this.sound}/>}
                                <TrackSlider sound={this.sound} width={this.props.width}
                                             position={this.state.position}/>
                            </>}
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
