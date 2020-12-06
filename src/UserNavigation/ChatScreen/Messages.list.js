import {FlatList} from "react-native";
import React from "react";
import Message from "./Message";
import {SocketContext} from "../SocketContextWrapper";

export default class MessagesList extends React.Component {
    static contextType = SocketContext

    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }

    getMessages = () => {
        this.context.socket.emit('getMessages', {chatId: this.props.chatId}, (error, response) => {
            if (error === null) {
                this.setState({
                    messages: response
                })
            }
        })

    }

    componentDidMount() {
        this.getMessages()
    }

    render() {
        return (
            <>
                <FlatList
                    data={this.state.messages.reverse()}
                    inverted={true}
                    renderItem={({item}) => <Message {...this.props} data={item}/>}
                    keyExtractor={item => item.id}
                />
            </>
        );
    }
}