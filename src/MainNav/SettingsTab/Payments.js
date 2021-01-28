import React from "react";
import {StyleSheet, View} from "react-native";
import {List} from "react-native-paper";
import Switch from "react-native-paper/src/components/Switch";

import Ionicons from "react-native-vector-icons/Ionicons";
import {axiosInstance} from "../../components/helpers/connectionInstances";
import {colorScheme} from "../../components/constants/Colors";
import ChangePrice from "./Payments/ChangePrice";
import ChangeCountry from "./Payments/ChangeCountry";


export default class Payments extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.globalState.user)
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


    toggleBusinessAccount = () => {
        //TODO: make this isMounted and isFetching compliable
        this.submitUpdate({
            businessActivated: !this.props.globalState.user.businessActivated
        }).then((r) => {
                this.props.refreshState(this.props.globalState.token)
            }
        ).catch(e => console.log(`Error in Payments ${e}`))

    }


    render() {
        return (

            <List.Section>
                {/*
                    Link Stripe account??
                    disable BA
                    Configure BA pricing
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
                            <ChangePrice {...this.props} />

                            <ChangeCountry {...this.props} />


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
        marginBottom: 5,
        backgroundColor: colorScheme.background
    },
});
