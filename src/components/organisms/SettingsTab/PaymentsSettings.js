import React from "react";
import {Linking, ScrollView, StyleSheet, View} from "react-native";
import {List} from "react-native-paper";
import Switch from "react-native-paper/src/components/Switch";

import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../constants/Colors";
import ChangePrice from "../../molecules/SettingsTab/ChangePrice";
import ChangeCountry from "../../molecules/SettingsTab/ChangeCountry";
import AddCard from "../../molecules/SettingsTab/AddCard";
import updateUserAPI from "../../../api/user/updateUserAPI";


export default class PaymentsSettings extends React.Component {

    constructor(props) {
        super(props);
    }

    submitUpdate = async (data) => {
        updateUserAPI(data, this.props.globalState.token)
            .then(r => {
                if (r && r.url) {
                    console.log(r.url)
                    Linking.openURL(r.url)
                }
                this.props.refreshState(this.props.globalState.token)

            })
            .catch(e => console.log(`Error in Payments ${e}`))
    }


    toggleBusinessAccount = () => {
        //TODO: make this isMounted and isFetching compliable
        //TODO: first add a payment method
        this.submitUpdate({
            businessActivated: !this.props.globalState.user.businessActivated
        }).then((r) => {
                this.props.refreshState(this.props.globalState.token)
            }
        ).catch(e => console.log(`Error in Payments ${e}`))

    }


    render() {
        return (
            <ScrollView>
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
                    <AddCard {...this.props} />

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

            </ScrollView>
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
