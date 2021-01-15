import React from "react";
import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";

export default class ContactSupport extends React.Component {


    render() {
        return (
            <View style={styles.containerStyle}>
                <Title>Contact Support</Title>
            </View>);
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
