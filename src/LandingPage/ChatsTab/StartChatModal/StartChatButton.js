import React from "react"
import StartChatForm from "./StartChatForm";
import {StyleSheet} from "react-native"
import {FloatingAction} from "react-native-floating-action";
import {Modal, Portal} from "react-native-paper";


const actions = [
    {
        text: "New Message",
        icon: require("../../../assets/images/voice-message.png"),
        name: "bt_new_message",
        position: 1
    },
    {
        text: "Settings",
        icon: require("../../../assets/images/settings.png"),
        name: "bt_settings",
        position: 2
    }
];

export default class StartChatButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    toggleModal = (callback) => {
        this.setState((prevstate) => ({
            modalOpen: !prevstate.modalOpen
        }), () => {

        })

    }

    render() {
        return (
            <>
                <Portal>
                    <Modal
                        visible={this.state.modalOpen}
                        onDismiss={() => this.toggleModal()}
                        animationType="fade"
                    >


                        <StartChatForm toggleModal={this.toggleModal} {...this.props}/>


                        <FloatingAction
                            actions={actions}
                            onPressItem={name => {
                                if (name === 'bt_new_message') {
                                    this.toggleModal()
                                }
                            }}
                        />
                    </Modal>
                </Portal>
            </>
        );
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})