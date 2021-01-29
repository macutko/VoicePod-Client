import React from "react";
import Card from "react-native-paper/src/components/Card/Card";
import Title from "react-native-paper/src/components/Typography/Title";
import Button from "react-native-paper/src/components/Button";
import {Modal, Portal, TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";

export default class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false
        this.state = {
            modalVisible: false
        }
    }

    getPaymentDetails = () => {
        console.log('Payment details TODO')
    }

    componentDidMount() {
        this._isMounted = true
        this.getPaymentDetails()

    }

    componentWillUnmount() {
        this._isMounted = false
    }

    addPayment = async () => {
        this.props.socket.emit('addPayment', {}, (err, res) => {
            if (err) console.log(`Error in AddCard ${err}`)
            else {
                console.log(`Res ${res}`)
            }
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible
        }))
    }

    render() {
        return (
            <>
                <Card>
                    <Card.Content>
                        <Title>Payment Method</Title>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => this.toggleModal()}>Add</Button>
                    </Card.Actions>
                </Card>

                <Portal>
                    <Modal
                        visible={this.state.modalVisible}
                        onDismiss={this.toggleModal}
                        animationType="fade"
                        contentContainerStyle={styles.containerStyle}
                    >
                        <TextInput
                            label="Card NUmber"
                            mode='outlined'
                            autoCompleteType={"off"}
                            textContentType={"none"}
                            onChangeText={(text) =>
                                this.setState({cardNumber: text})
                            }
                            errorMessage={this.state.titleError}
                            style={styles.inputStyle}
                        />
                        <TextInput
                            label="Expiry"
                            mode='outlined'
                            autoCompleteType={"off"}
                            textContentType={"none"}
                            onChangeText={(text) =>
                                this.setState({expiry: text})
                            }
                            errorMessage={this.state.titleError}
                            style={styles.inputStyle}
                        />
                        <TextInput
                            label="CVV"
                            mode='outlined'
                            autoCompleteType={"off"}
                            textContentType={"none"}
                            onChangeText={(text) =>
                                this.setState({cvv: text})
                            }
                            errorMessage={this.state.titleError}
                            style={styles.inputStyle}
                        />
                        <Button onPress={() => this.addPayment()}>Add</Button>
                    </Modal></Portal>
            </>
        );
    }
}


const styles = StyleSheet.create({
    containerStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"},
});

