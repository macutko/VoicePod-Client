import React from "react";
import Card from "react-native-paper/src/components/Card/Card";
import Title from "react-native-paper/src/components/Typography/Title";
import Button from "react-native-paper/src/components/Button";
import {Modal, Portal} from "react-native-paper";
import {StyleSheet} from "react-native";
import {getPaymentMethodAPI} from "../../../api/getPaymentMethodAPI";

//TODO: REFACTOR
// stripe.setOptions({
//     publishableKey: 'pk_test_51IDSTZECU7HrwjM1mvfNnY2spqwoSGu9rAKZYia8Egd4QRruVp9S6HIUaPi1WEWWDM8sEcNMN5r4fioXDibqBvi4008TNJG6Xe',
//     androidPayMode: 'test', // Android only
// })

export default class AddCard extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false
        this.state = {
            modalVisible: false
        }
    }

    getPaymentDetails = () => {
        getPaymentMethodAPI(this.props.socket, {}).then(r => {
            // console.log(`Res ${Object.keys(r)}`)
        }).catch(e => console.log(e))
    }

    componentDidMount() {
        this._isMounted = true
        this.getPaymentDetails()

    }

    componentWillUnmount() {
        this._isMounted = false
    }

    addPayment = async () => {
        // stripe.createPaymentMethod({
        //     card: {
        //         number: '4000002500003155',
        //         cvc: '123',
        //         expMonth: 11,
        //         expYear: 2021
        //     }
        // }).then(r => {
        //     if (!r.error) {
        //         console.log(r.id)
        //         this.props.socket.emit('addPaymentMethod', {paymentMethod: r.id}, (err, res) => {
        //             if (err) console.log(`Error in AddCard ${err}`)
        //             else {
        //                 console.log(`Res ${res}`)
        //                 stripe.confirmSetupIntent({
        //                     clientSecret: res,
        //                     paymentMethodId: r.id
        //                 }).then(response => {
        //                     console.log(`Success ${Object.keys(response)}`)
        //                     this.props.socket.emit('setDefaultPaymentMethod', {paymentMethod: r.id}, (e, re) => {
        //                         //    TODO fix naming of resposne and error in this monolith
        //                         if (e) console.log(`Error in addcard ${e}`)
        //                         else {
        //                             console.log(`res ${re}`)
        //                         }
        //                     })
        //                 }).catch(e => {
        //                     console.log(`Error on confirm setup ${e}`)
        //                 })
        //             }
        //         })
        //     }
        //
        // }).catch(e => {
        //     console.log(`ERror on creatingPayment Method ${e}`)
        // })

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

                        <Button onPress={() => this.addPayment()}>Add</Button>
                    </Modal></Portal>
            </>
        );
    }
}


const styles = StyleSheet.create({
    containerStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"},
    field: {
        width: 300,
        color: '#449aeb',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
    }
});

