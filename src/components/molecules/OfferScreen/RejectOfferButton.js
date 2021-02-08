import {Button} from "react-native-paper";
import {StyleSheet} from "react-native";
import {colorScheme} from "../../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import {rejectOfferAPI} from "../../../api/offer/rejectOfferAPI";

const RejectOfferButton = ({navigation, socket, offerId}) => {

    const rejectOffer = () => {
        rejectOfferAPI(socket, {offerId: offerId}).then(r => {
            console.log(`Res r`)
            navigation.navigate('OffersTab')
        }).catch(e => console.log(e))
    }

    return (

        <Button style={styles.button}
                icon={props => <Ionicons {...props} name={'close-circle'}/>}
                mode="outlined"
                onPress={() => rejectOffer()}>
            Reject
        </Button>

    )

}
export default RejectOfferButton


const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        backgroundColor: colorScheme.background
    }
})
