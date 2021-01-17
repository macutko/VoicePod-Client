import React from "react";
import {StyleSheet, View} from "react-native";
import {List} from "react-native-paper";
import Switch from "react-native-paper/src/components/Switch";

import Ionicons from "react-native-vector-icons/Ionicons";
import {axiosInstance} from "../../components/helpers/connectionInstances";
import TextInput from "react-native-paper/src/components/TextInput/TextInput";
import {colorScheme} from "../../components/constants/Colors";

export default class Payments extends React.Component {

    constructor(props) {
        super(props);
        this.textInput = React.createRef();

    }

    submitUpdate = async (data) => {

        await axiosInstance
            .post("/user/updateAccount", data, {
                headers: {
                    Authorization: `Bearer ${this.props.globalState.token}`
                },
            })
            .then((response) => {
                console.log(`Response form Payments ${response.status}`)
            })
            .catch((error) => {
                console.log(`Error in Payments ${error}`)
            });
    }

    onChangePrice = (text) => {
        let newUser = this.props.globalState.user
        newUser.price = text
        this.props.updateGlobalState(newUser, this.props.globalState.token, true)

    }
    onSubmitPrice = () => {
        this.submitUpdate({
            price: this.props.globalState.user.price
        }).then((r) => {
                this.props.refreshState(this.props.globalState.token, () => console.log(` Current Pirce: ${this.props.globalState.user.price}`))

            }
        ).catch(e => console.log(`Error in Payments ${e}`))
    }


    toggleBusinessAccount = () => {
        let newUser = this.props.globalState.user
        newUser.businessActivated = !this.props.globalState.user

        this.props.updateGlobalState(newUser, this.props.globalState.token, true,
            () => {
                this.submitUpdate({
                    businessActivated: newUser.businessActivated,
                }).then((r) => {
                        this.props.refreshState(this.props.globalState.token)
                        console.log(` Current BA : ${this.props.globalState.user.businessActivated}`)
                    }
                ).catch(e => console.log(`Error in Payments ${e}`))
            })
    }


    render() {
        return (

            <List.Section>
                {/*
                    Link Stripe account??
                    disable BA
                    Configure BA pricing
                    send refunds
            */}
                <List.Subheader>Payments</List.Subheader>
                <List.Item title="Business account"
                           right={() => <Switch value={this.props.globalState.user.businessActivated}
                                                onValueChange={this.toggleBusinessAccount}/>}/>
                {this.props.globalState.user.businessActivated ?
                    <List.Accordion
                        title="Business options"

                        left={props => <List.Icon {...props}
                                                  icon={props => <Ionicons {...props} name={'cash-outline'}/>}/>}
                        expanded={this.props.globalState.user.businessActivated}>
                        <View style={styles.containerStyle}>
                            <TextInput
                                ref={this.textInput}
                                style={styles.textInput}
                                label="Price per minute"
                                type={'outlined'}
                                keyboardType={'number-pad'}
                                value={`${this.props.globalState.user.price.toString()}`}
                                onSubmitEditing={this.onSubmitPrice}
                                onChangeText={this.onChangePrice}
                                right={<TextInput.Affix text={'$'}/>}
                            />

                        </View>
                    </List.Accordion> : null}

            </List.Section>


        );
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 20
    },
    textInput: {
        width: "80%",
        paddingHorizontal: "10%",
        backgroundColor: colorScheme.background
    },
});
