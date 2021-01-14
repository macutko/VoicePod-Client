import React from "react"
import {StyleSheet, View} from "react-native";
import NewMessageBox from "./NewMessageBox";
import MessagesList from "./Messages.list";

export default class ChatScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <MessagesList chatId={this.props.route.params.data.chatId}/>
                </View>
                <View style={styles.bottom}>
                    <NewMessageBox chatId={this.props.route.params.data.chatId}/>

                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 4,
        justifyContent: 'flex-start',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})