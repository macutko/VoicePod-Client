import React from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Button, Title} from "react-native-paper";
import Text from "react-native-paper/src/components/Typography/Text";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class BusinessProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    navigateToOfferCreation = () => {
        this.props.mainNav.navigate('IntroOffer',{...this.props.route.params})
    }

    render() {
        return (
            <View style={styles.containerStyle}>

                <Avatar.Image size={200}
                              source={{uri: `data:image/${this.props.route.params.pictureType};base64,${this.props.route.params.profilePicture}`}}/>

                <Text style={styles.handle}>@{this.props.route.params.username}</Text>
                <Title
                    style={styles.nameTag}>{this.props.route.params.firstName} {this.props.route.params.lastName}</Title>

                <Text style={styles.description}>{this.props.route.params.description}</Text>
                <Button mode="contained" icon={props => <Ionicons {...props} name={'send'}/>}
                        onPress={() => this.navigateToOfferCreation()} style={styles.buttonStyle}>
                    Send Offer
                </Button>
            </View>);
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
