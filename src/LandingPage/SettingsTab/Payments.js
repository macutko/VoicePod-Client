import React from "react";
import {StyleSheet} from "react-native";
import {List} from "react-native-paper";
import Switch from "react-native-paper/src/components/Switch";

import Ionicons from "react-native-vector-icons/Ionicons";
import {axiosInstance} from "../../components/helpers/connectionInstances";

export default class Payments extends React.Component {
    constructor(props) {
        super(props);
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
        let newUser = this.props.globalState.user
        newUser.businessActivated = !newUser.businessActivated
        this.props.updateGlobalState(newUser, this.props.globalState.token,
            () => {
                this.submitUpdate({
                    businessActivated: newUser.businessActivated
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
                {this.props.globalState.user.businessActivated ? <List.Accordion
                    title="Business options"
                    left={props => <List.Icon {...props} icon={props => <Ionicons {...props} name={'cash-outline'}/>}/>}
                    expanded={this.props.globalState.user.businessActivated}
                >
                    <List.Item title="First item"/>
                    <List.Item title="Second item"/>
                </List.Accordion> : null}

            </List.Section>


        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
