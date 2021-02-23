import {StyleSheet, View} from "react-native"
import React from "react"
import {colorScheme} from "../../constants/Colors"
import PlayButton from "./PlayButton"
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator"
import TrackSlider from "./TrackSlider"
import PauseButton from "./PauseButton"
import {Audio} from "expo-av"

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            loading: true,
            position: 0,
        }
        this.sound = null
        this._isMounted = false
    }

    onSoundUpdate = (status) => {

        if (this._isMounted) {
            if (!status.isBuffering) {
                this.setState({
                    loading: false,
                })
            }
            if (status.isPlaying) {
                this.setState({
                    playing: true,
                })
            }
            if (!status.isPlaying) {
                this.setState({
                    playing: false,
                })
            }
            this.setState({
                position: status.positionMillis,
            })
        }

    }

    componentWillUnmount() {
        this._isMounted = false
        if (this.sound !== null) {
            this.sound.unloadAsync().then(r => {
                this.sound = null
            }).catch(e => console.log(e))
        }
    }

    componentDidMount() {
        this._isMounted = true

        Audio.Sound.createAsync({uri: this.props.pathToSound}).then(r => {
            if (this._isMounted) {
                this.sound = r.sound
                this.sound.setProgressUpdateIntervalAsync(100).then().catch(e => console.log(e))
                this.sound.setOnPlaybackStatusUpdate(this.onSoundUpdate)
            }
        }).catch(e => console.log(`Error on reading audio ${e}`))

    }

    render() {
        return (
            <View style={this.props.style}>
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        {this.state.loading ?
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
})
