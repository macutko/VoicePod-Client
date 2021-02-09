import {Button, TextInput, Title} from "react-native-paper";
import React from "react";
import {StyleSheet} from "react-native";
import {colorScheme} from "../../constants/Colors";
import LargeTextInput from "../../components/atoms/LargeTextInput";
import {updateReviewByChatIdAPI} from "../../api/review/updateReviewByChatIdAPI";
import {getReviewByChatIdAPI} from "../../api/review/getReviewByChatIdAPI";

export default class LeaveReviewScreen extends React.Component {
    // TODO: make into fucntional component and finish
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
        updateReviewByChatIdAPI(this.props.socket, {
            chatId: this.props.route.params.chatId,
            title: this.state.title,
            review: this.state.review,
            stars: this.state.stars
        }).then(res => {
            if (res) {
                this.props.navigation.goBack(null)
            }
        }).catch(e => console.log(`Error in leave reivew ${e}`))
    }

    getReview = () => {
        getReviewByChatIdAPI(this.props.socket, {chatId: this.props.route.params.chatId}).then(res => {
            console.log(`Res ${!!res ? Object.keys(res) : res}`)
            this.setState({...res})
        }).catch(e => console.log(e))
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
