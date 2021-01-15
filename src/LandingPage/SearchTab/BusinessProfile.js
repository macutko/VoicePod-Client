import React from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Text, Title} from "react-native-paper";

export default class BusinessProfile extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.route.params.props)
    }

    render() {
        return (
            <View style={styles.containerStyle}>

                <Avatar.Image size={200}
                              source={{uri: `data:image/${this.props.route.params.props.pictureType};base64,${this.props.route.params.props.profilePicture}`}}/>

                <Text style={styles.handle}>@{this.props.route.params.props.username}</Text>
                <Title
                    style={styles.nameTag}>{this.props.route.params.props.firstName} {this.props.route.params.props.lastName}</Title>

                <Text style={styles.description}>{this.props.route.params.props.description}</Text>

            </View>);
    }
}

const styles = StyleSheet.create({
    modalStyle: {backgroundColor: 'white', padding: 20, marginHorizontal: "5%"},
    buttonStyle: {
        alignItems: "center",
        justifyContent: "center",
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
    inputStyle: {
        marginBottom: "5%",
    },
    description: {
        paddingTop: 10,
        fontSize: 20,
        paddingHorizontal: "10%",
        textAlign: 'left'
    },
    containerStyle: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});
