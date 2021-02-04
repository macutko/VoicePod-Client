import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../constants/Colors";
import IconButton from "react-native-paper/src/components/IconButton";
import React from "react";
import AudioRecord from "react-native-audio-record";
import * as RNFS from "react-native-fs";
import {PermissionsAndroid, StyleSheet, View} from "react-native";
import {Paragraph} from "react-native-paper";
import AudioPlayer from "../../../components/AudioPlayer";


const options = {
    sampleRate: 16000,  // default 44100
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only
};

export default class RecordButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amountLeft: {
                minutes: 0,
                seconds: 0
            },
            originalAmount: 0,
            recording: false,
            timer: null,
            counter: null,
            voiceClip: null,
        }
    }

    tick = () => {
        let newBudget = (60 * this.state.amountLeft.minutes) + this.state.amountLeft.seconds - 1
        let nbMinutes = Math.floor(newBudget / 60)
        let nbSeconds = newBudget - nbMinutes * 60

        this.setState({
            amountLeft: {
                minutes: parseFloat(nbMinutes.toFixed(0)),
                seconds: parseFloat(nbSeconds.toFixed(0))
            }
        }, () => {
            if ((this.state.amountLeft.minutes <= 0 && this.state.amountLeft.seconds <= 0.9)) {
                // stop recording
                AudioRecord.stop().then(r => {
                    clearInterval(this.state.timer)
                    RNFS.readFile(r, 'base64')
                        .then((data) => {
                            this.setState({
                                voiceClip: data,
                                recording: false,
                            })
                        })
                })
            }
        })

        console.log(`minutes: ${nbMinutes} and seconds ${nbSeconds}`)
    }


    record = () => {
        console.log(`Recording: ${this.state.recording}`)

        if (!(this.state.amountLeft.minutes <= 0 && this.state.amountLeft.seconds <= 0.9)) {


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
                    clearInterval(this.state.timer)
                    RNFS.readFile(r, 'base64')
                        .then((data) => {
                            this.setState({
                                voiceClip: data,
                                recording: false,
                            })
                        })
                })
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
        AudioRecord.stop().then()
        this._isMounted = false
    }


    getMinuteBalance = () => {

        this.props.socket.emit('getMinutesBalance', {chatId: this.props.chatId}, (err, res) => {
            if (err) console.log(`Error in record button ${err}`)
            if (res && this._isMounted) {

                let newBudget = (60 * res.minutes)
                let nbMinutes = Math.floor(newBudget / 60)
                let nbSeconds = Math.round(newBudget - nbMinutes * 60)

                this.setState({
                    originalAmount: res.minutes,
                    amountLeft: {
                        minutes: parseFloat(nbMinutes.toFixed(0)),
                        seconds: parseFloat(nbSeconds.toFixed(0))
                    }
                }, () => {
                    console.log(`Minutes left: ${this.state.amountLeft.minutes}`)
                    if (this.state.amountLeft.minutes <= 0 && this.state.amountLeft.seconds <= 0.9) {
                        this.props.toggleOfferDialog()
                    }
                })
            }
        })
    }


    cancel = (cb = null) => {
        console.log("cancel")

        let newBudget = (60 * this.state.originalAmount)
        let nbMinutes = Math.floor(newBudget / 60)
        let nbSeconds = newBudget - nbMinutes * 60


        this.setState({
            amountLeft: {
                minutes: parseFloat(nbMinutes.toFixed(0)),
                seconds: parseFloat(nbSeconds.toFixed(0))
            },
            voiceClip: null
        }, () => cb == null ? null : cb())
    }

    submit = () => {
        this.props.socket.emit('newMessage', {
            chatId: this.props.chatId,
            voiceClip: this.state.voiceClip
        }, (err, res) => {
            if (err) console.log(`Error in record Button ${err}`)
            if (res && this._isMounted) {
                console.log(`Res ${res}`)
                this.setState({
                    voiceClip: null
                }, () => this.getMinuteBalance())

            }

        })
    }

    async componentDidMount() {
        this._isMounted = true //TODO: this is an antipattern, however I have not found a working & elegant solution to socket yet
        this.getMinuteBalance()
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        AudioRecord.init({...options, wavFile: `newMessage_${this.props.chatId}.wav`})
    }

    render() {
        return (
            <>
                {this.state.voiceClip === null ? <IconButton
                        icon={props => <Ionicons {...props} name={'mic'}/>}
                        color={colorScheme.accent}
                        disabled={this.state.amountLeft.minutes === 0 && this.state.amountLeft.seconds === 0}
                        style={styles.recordButton}
                        // onPressIn={() => console.log("pressed")}
                        onPress={() => console.log("pressed")}
                        onPressOut={() => this.record()}
                        onPressIn={() => this.record()}
                    /> :
                    <>
                        <View style={styles.playContainer}>
                            <View style={styles.playContainer_inside}>
                                <IconButton
                                    icon={props => <Ionicons {...props} name={'close-circle'}/>}
                                    color={colorScheme.background_subtle}
                                    // size={20}
                                    style={styles.cancelButton}
                                    onPress={() => this.cancel()}
                                />
                                <AudioPlayer soundBits={this.state.voiceClip}
                                             style={styles.audioPlayer}
                                             pathToSound={`newMessage_${this.props.chatId}.wav`}/>
                                <IconButton
                                    icon={props => <Ionicons {...props} name={'checkmark-circle'}/>}
                                    color={colorScheme.background_subtle}
                                    style={styles.cancelButton}
                                    onPress={() => this.submit()}
                                />
                            </View>
                        </View>
                    </>}


                <View style={styles.container}>
                    <View style={styles.used}>
                        {/*TODO: this needs to be different a bit for the consultant*/}
                    </View>
                    <View style={styles.free}>
                        <Paragraph>{`Time left minutes: ${this.state.amountLeft.minutes} and seconds: ${this.state.amountLeft.seconds}`}</Paragraph>
                    </View>
                </View>
            </>
        );
    }
}


const styles = StyleSheet.create({
    recordButton: {
        height: "30%",
    },
    audioPlayer: {
        width: '70%'
    },
    playContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    playContainer_inside: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    cancelButton: {
        alignSelf: "center",
        backgroundColor: 'red',
        // paddingLeft: 15,
        width: "10%"
    },
    container: {
        width: '100%',
        // height: 20,
        backgroundColor: colorScheme.accent,
        color: colorScheme.background,
        alignContent: "center",
        alignItems: "center"

    },
    free: {},
    used: {}
})