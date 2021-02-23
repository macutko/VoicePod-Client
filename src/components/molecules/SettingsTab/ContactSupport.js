import React from "react"
import {StyleSheet, View} from "react-native"
import {Button, Dialog, Paragraph, Portal, TextInput, Title} from "react-native-paper"
import {colorScheme} from "../../../constants/Colors"
// TODO: REFACTOR
export default class ContactSupport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            message: "",
            successSend: false,
            failSend: false,
        }
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    sendMessage = () => {
        if (this.state.title === "") {
            this.setState({
                titleError: "Please add some text",
            })
        } else if (this.state.message === "") {
            this.setState({
                messageError: "Please add some text",
            })
        } else {
            this.props.socket.emit("contactSupport", {
                title: this.state.title,
                message: this.state.message,
            }, (err, res) => {
                if (err) console.log(`Error in contact support ${err}`)
                else {
                    console.log(`Res ${res}`)
                    if (this._isMounted && res) {
                        this.setState({
                            successSend: true,
                        })
                    } else if (this._isMounted && !res) {
                        this.setState({
                            failSend: true,
                        })
                    }
                }
            })
        }
    }

    closeDialogSuccess = () => {
        if (this._isMounted) {
            this.setState(prevState => ({
                successSend: false,
            }), () => this.props.navigation.goBack(null))
        }
    }

    closeDialogFail = () => {
        if (this._isMounted) {
            this.setState(prevState => ({
                failSend: false,
            }), () => this.props.navigation.goBack(null))
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Title>Contact Support</Title>
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
                />
                <TextInput
                    label="Message"
                    mode='outlined'
                    autoCompleteType={"off"}
                    textContentType={"none"}
                    onChangeText={(text) =>
                        this.setState({message: text})
                    }
                    multiline={true}
                    numberOfLines={10}
                    errorMessage={this.state.messageError}
                    style={styles.inputStyle}
                />
                <Button mode="contained" onPress={() => this.sendMessage()} style={styles.buttonStyle}>
                    Send!
                </Button>

                <Portal>
                    <Dialog visible={this.state.successSend} onDismiss={() => this.closeDialogSuccess()}>
                        <Dialog.Title>Your message was sent</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Thank you for your message! We will try to respond as soon as
                                possible</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => this.closeDialogSuccess()}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


                <Portal>
                    <Dialog visible={this.state.failSend} onDismiss={() => this.closeDialogFail()}>
                        <Dialog.Title>Your message was not sent</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>There seems to be a problem with sending your message. Please make sure no field
                                is empty and that you are connected to the internet. If still nothing works, please send
                                us an email to your@mom.com</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => this.closeDialogFail()}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


            </View>)
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    errorMessage: {
        color: colorScheme.error,
    },
    inputStyle: {
        marginBottom: "5%",
    },
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
    },
})
