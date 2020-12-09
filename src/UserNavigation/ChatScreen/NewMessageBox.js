import React from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {colorScheme} from "../../constants/Colors";
import {Input} from "react-native-elements";
import {SocketContext} from "../SocketContextWrapper";
import RecordButton from "./RecordButton";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class NewMessageBox extends React.Component {
    static contextType = SocketContext

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }

    }

    onChangeText = (text, name) => {
        this.setState({
            [name]: text
        });
    };
    sendMessage = () => {
        this.context.socket.emit('newMessage', {
            message: this.state.message,
            chatId: this.props.chatId
        }, (error, response) => {
            // console.log(error, response)
        })
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <Input
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={styles.textInputStyle}
                            placeholder="Message"
                            onChangeText={(text) => this.onChangeText(text, "message")}
                        />
                    </View>
                    <View style={styles.send}>
                        <TouchableOpacity
                            onPress={() => this.sendMessage()}
                        >

                            <Icon name="paper-plane" size={25}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.send}>
                        <RecordButton chatId={this.props.chatId}/>
                    </View>
                </View>

            </>
        );
    }
}


const styles = StyleSheet.create({
    inputView: {
        alignItems: "center",
        justifyContent: "center",
        flex: 4
    },
    send: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        backgroundColor: colorScheme.containerColor,
        flexDirection: "row"
    },
    inputContainer: {
        width: "100%",
        borderColor: colorScheme.FormText,
    },
    textInputStyle: {
        fontSize: 15,
        fontFamily: "DimboRegular",
    }
});


