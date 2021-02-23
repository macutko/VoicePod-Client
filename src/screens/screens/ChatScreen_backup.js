import React from "react"
import {StyleSheet} from "react-native"

export default class ChatScreen extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            messages: [],
            offer: null,
            menuVisible: false,
            isFetching: true,
            thisIsMyClient: !props.route.params.consultant,
            offerEndLifeCycleDialog: false,
        }
        this._isMounted = false
    }

    toggleOfferDialog = () => {
        if (this._isMounted) {
            this.setState((prevState) => ({
                offerEndLifeCycleDialog: !prevState.offerEndLifeCycleDialog,
            }))
        }
    };


    componentDidMount() {


        this.props.socket.on("newMessage", (data) => {
            if (data.chatId === this.props.route.params.id) {
                const joined = [data.message].concat(this.state.messages)
                if (this._isMounted) {
                    this.setState((prevState) => ({
                        messages: joined,
                    }))
                }
            }
        })
    }


    render() {
        return (<>


            <>


                <Portal>
                    <Dialog
                        visible={this.state.offerEndLifeCycleDialog}
                        onDismiss={this.toggleOfferDialog}
                    >
                        <Dialog.Title>Your chat has ended</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                You need to start a new offer in case you are interested to
                                continue this conversation
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            {/* <Button onPress={() => console.log('increase budget')}>Increase budget</Button>*/}
                            <Button onPress={() => this.closeChat()}>Close</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </>
        </>)
    }
}

const styles = StyleSheet.create({
    bottom_container: {
        alignItems: "center",
        height: "20%",
    },
    messagesContainer: {
        height: "80%",
    },
})
