import React from "react";
import {StyleSheet} from "react-native";
import {List} from "react-native-paper";
import Switch from "react-native-paper/src/components/Switch";

export default class Payments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessAccountEnabled: false
        }
    }

    toggleBusinessAccount = () => {
        console.log(this.props.route)
        this.setState((prevState) => ({
            businessAccountEnabled: !prevState.businessAccountEnabled
        }))
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
                <List.Item title="Business account" right={() => <Switch value={this.state.businessAccountEnabled}
                                                                         onValueChange={this.toggleBusinessAccount}/>}/>


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
