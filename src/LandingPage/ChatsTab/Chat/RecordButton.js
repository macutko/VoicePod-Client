import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../components/constants/Colors";
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
                minutes: nbMinutes,
                seconds: nbSeconds
            }
        })

        console.log(`minutes: ${nbMinutes} and seconds ${nbSeconds}`)
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

    getMinuteBalance = () => {
        this.props.socket.emit('getMinutesBalance', {chatId: this.props.chatId}, (err, res) => {
            if (err) console.log(`Error in record button ${err}`)
            if (res) {

                let newBudget = (60 * res.minutes)
                let nbMinutes = Math.floor(newBudget / 60)
                let nbSeconds = Math.round(newBudget - nbMinutes * 60)

                this.setState({
                    originalAmount: res.minutes,
                    amountLeft: {
                        minutes: nbMinutes,
                        seconds: nbSeconds
                    }
                }, () => console.log(`Minutes left: ${this.state.amountLeft.minutes}`))
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
                minutes: nbMinutes,
                seconds: nbSeconds
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
            if (res) {
                console.log(`Res ${res}`)
                this.cancel(this.getMinuteBalance())
            }

        })
    }

    async componentDidMount() {
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
                        size={40}
                        onPress={() => this.record()}
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
        height: 20,
        backgroundColor: colorScheme.accent,
        color: colorScheme.background,
        alignContent: "center",
        alignItems: "center"

    },
    free: {},
    used: {}
})