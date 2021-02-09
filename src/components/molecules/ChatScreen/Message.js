import React from "react";
import {StyleSheet, View} from "react-native";
import GlobalContext from "../../atoms/GlobalState";
import AudioPlayer from "../../atoms/AudioPlayer/AudioPlayer";


//TODO: REFACTOR
//TODO : pull data on play
export default class Message extends React.Component {
    static contextType = GlobalContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            ownMessage: this.props.data.from.username === context.globalState.user.username
        }
        //    TODO: make "read" prop true when opened
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
    }

    render() {
        return (

            <View style={{paddingTop: 10}}>
                <View style={this.state.ownMessage ? styles.ownMessage : styles.otherMessage}>
                    <AudioPlayer fileName={`${this.props.data.id}_${this.props.data.chatId}`}
                                 soundBits={this.props.data.soundBits}/>
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
