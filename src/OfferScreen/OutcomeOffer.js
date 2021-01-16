import Title from "react-native-paper/src/components/Typography/Title";
import React from "react";
import {Button} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";

export default class OutcomeOffer extends React.Component {
    render() {
        return (
            <>
                <Title>What Outcome are you hoping to gain?</Title>
                <Button mode="contained" icon={props => <Ionicons {...props} name={'send'}/>}
                        onPress={() => this.props.navigation.navigate('LandingPage')} style={styles.buttonStyle}>
                    Next
                </Button>
            </>


        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        width: "80%"
    },
    nameTag: {
        marginTop: 20,
        fontSize: 30
    },
    handle: {
        fontSize: 15,
        paddingTop: 10,
        fontStyle: 'italic'
    },
    description: {
        paddingTop: 10,
        fontSize: 20,
        width: "80%",
        textAlign: 'justify'
    },
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
