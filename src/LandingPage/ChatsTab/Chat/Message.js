import React from "react";
import {StyleSheet, View} from "react-native";
import AudioPlayer from "../../../components/AudioPlayer";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ownMessage: this.props.data.from.username === this.props.globalState.user.username
        }
        //    TODO: make "read" prop true when opened
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
    }

    getTranscript = () => {
        console.log(Object.keys(this.props.data))
        this.props.socket.emit('getTranscript', {messageId: this.props.data.id}, (err, res) => {
            if (err) console.log(`Err in Message ${err}`)
            else {
                if (this._isMounted) {
                    this.setState({
                        text: res
                    })
                }
            }
        })
    }

    render() {
        return (

            <View style={{paddingTop: 10}}>
                <View style={this.state.ownMessage ? styles.ownMessage : styles.otherMessage}>
                    <AudioPlayer soundBits={this.props.data.soundBits}
                                 menuPress={this.getTranscript}
                                 pathToSound={`${this.props.data.id}_${this.props.data.chatId}.wav`}/>


                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    ownMessage: {
        width: '70%',
        alignSelf: 'flex-end',
        marginBottom: 5
    },
    otherMessage: {
        width: '70%',
        marginBottom: 5
    }
})