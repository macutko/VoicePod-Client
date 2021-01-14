import {Avatar, Title} from "react-native-paper";
import React from "react";
import {StyleSheet, View} from "react-native";

export default class UserProfile extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Avatar.Image size={200} source={require('../../assets/images/sound-bars.png')}/>
                <Title style={styles.nameTag}>User Name</Title>
            </View>);
    }
}

const styles = StyleSheet.create({
    nameTag: {
        marginTop: 10,
        fontSize: 24
    },
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
