//TODO: REFACTOR

import {Button, TextInput, Title} from "react-native-paper";
import React from "react";
import {StyleSheet} from "react-native";
import {colorScheme} from "../../constants/Colors";
import LargeTextInput from "../../components/atoms/LargeTextInput";

export default class LeaveReviewScreen extends React.Component {

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            title: '',
            review: '',
            tags: [],
            stars: 5
        }
    }

    sendReview = () => {
        this.props.socket.emit('updateReviewByChatId', {
            chatId: this.props.route.params.chatId,
            title: this.state.title,
            review: this.state.review,
            stars: this.state.stars
        }, (err, res) => {
            if (err) console.log(`Error in leave reivew ${err}`)
            else {
                console.log(`Res ${res}`)
                if (res) {
                    this.props.navigation.goBack(null)
                }
            }
        })
    }

    getReview = () => {
        this.props.socket.emit('getReviewByChatId', {chatId: this.props.route.params.chatId}, (err, res) => {
            if (err) console.log(`Error in leave review ${err}`)
            else {
                console.log(`Res ${!!res ? Object.keys(res) : res}`)
                this.setState({...res})
            }
        })
    }

    componentDidMount() {
        console.log(this.props.route.params.chatId)
        this._isMounted = true
        this.getReview()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <>
                <Title>Leave Review</Title>
                <TextInput
                    label="Title"
                    mode='outlined'
                    autoCompleteType={"off"}
                    textContentType={"none"}
                    onChangeText={(text) =>
                        this.setState({title: text})
                    }
                    errorMessage={this.state.titleError}
                    style={styles.inputStyle}
                    value={this.state.title}
                />

                <LargeTextInput onChangeText={(text) => this.setState({review: text})} label={"Review"}
                                value={this.state.review} errorMessage={this.state.reviewError}/>
                <Button mode="contained" onPress={() => this.sendReview()} style={styles.buttonStyle}>
                    Send!
                </Button>
            </>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 20,
        paddingHorizontal: 20
    },
    errorMessage: {
        color: colorScheme.error,
    },
});
