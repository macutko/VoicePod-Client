import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Button, Title} from "react-native-paper";
import Text from "react-native-paper/src/components/Typography/Text";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AddPaymentWarning} from "../../molecules/SearchTab/AddPaymentWarning";
import {ReviewsList} from "../../molecules/SearchTab/ReviewsList";
import {checkDefaultPaymentMethod} from "../../../api/checkDefaultPaymentMethod";

const UserProfile = (props) => {
    const _isMounted = useRef(true);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        return () => { // ComponentWillUnmount in Class Component
            _isMounted.current = false;
        }
    }, []);


    const navigateToOfferCreation = () => {
        checkDefaultPaymentMethod(props.socket).then(r => {
            if (r) {
                props.mainNav.navigate('IntroCreateOfferScreen', {...props.route.params})
            } else {
                if (_isMounted) setShowDialog(!showDialog)
            }
        }).catch(e => console.log(e))
    }


    return (
        <View style={styles.containerStyle}>

            <Avatar.Image size={200}
                          source={{uri: `data:image/${props.route.params.pictureType};base64,${props.route.params.profilePicture}`}}/>

            <Text style={styles.handle}>@{props.route.params.username}</Text>

            <Title
                style={styles.nameTag}>{props.route.params.firstName} {props.route.params.lastName}</Title>

            <Text style={styles.description}>{props.route.params.description}</Text>
            <Button mode="contained" icon={props => <Ionicons {...props} name={'send'}/>}
                    onPress={() => navigateToOfferCreation()} style={styles.buttonStyle}>
                Send Offer
            </Button>

            <ReviewsList username={props.route.params.username}/>

            <AddPaymentWarning toggleDialog={_isMounted ? () => setShowDialog(!showDialog) : null}
                               navigation={props.navigation}
                               showDialog={showDialog}/>

        </View>);

}
export default UserProfile;

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
    },

});
