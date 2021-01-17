import React from "react"
import {StyleSheet} from "react-native";
import {Title} from "react-native-paper";

export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    getMessages = () => {
        this.props.socket.emit('getMessages', {chatId: this.props.route.params.id}, (err, res) => {
            if (err != null) console.log(`Error in Chat screen ${err}`)
            else {
                console.log(`Res ${res}`)
                this.setState({
                    messages: res
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
                <Title>CHAT!</Title>
            </>
        );
    }
}


const styles = StyleSheet.create({})