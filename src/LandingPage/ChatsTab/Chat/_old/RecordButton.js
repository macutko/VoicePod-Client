import React from "react"
import AudioRecord from 'react-native-audio-record';
import {PermissionsAndroid, TouchableOpacity} from "react-native";
import {SocketContext} from "../../../SocketContextWrapper";
import * as RNFS from 'react-native-fs'
import Icon from "react-native-vector-icons/FontAwesome";
import LanguageSelect from "./LanguageSelect";

const options = {
    sampleRate: 16000,  // default 44100
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only
    wavFile: 'test.wav' // default 'audio.wav'
};


export default class RecordButton extends React.Component {
    static contextType = SocketContext

    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            modalOpen: false,
            language: 'en-EN',
        }


    }

    async componentDidMount() {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        AudioRecord.init(options)

    }

    record = () => {
        if (!this.state.recording) {
            this.setState({recording: true}, () => {
                AudioRecord.start()
            })
        } else {
            AudioRecord.stop().then(r => {
                this.setState({recording: false})

                RNFS.readFile(r, 'base64')
                    .then((data) => {

                        this.context.socket.emit('sendingAudioMessage', {
                            chatId: this.props.chatId,
                            language: this.state.language,
                            sound: data
                        }, (error, response) => {
                            console.log(error, response)
                        });
                    })
            });


        }
    }

    // componentWillUnmount() {
    //     AudioRecord.stop().then(r => console.log(r))
    // }

    languageOption = () => {
        this.setState({
            modalOpen: true
        })
    }
    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }
    setLanguage = (option) => {
        this.setState({
            language: option
        })
    }

    render() {
        return (
            <>
                <TouchableOpacity onLongPress={() => this.languageOption()} onPress={() => this.record()}>
                    <Icon name="microphone" color={this.state.recording ? "#FF0000" : "#000"} size={30}/>
                </TouchableOpacity>

                <LanguageSelect modalOpen={this.state.modalOpen}
                                setLanguage={this.setLanguage} close={this.closeModal}/>

            </>
        );
    }
}