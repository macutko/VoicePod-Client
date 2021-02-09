import {Button} from "react-native-paper";
import {StyleSheet} from "react-native";
import {colorScheme} from "../../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {acceptOfferAPI} from "../../../api/offer/acceptOfferAPI";
import React from "react";

const AcceptOfferButton = ({navigation, socket, offerId}) => {

    const acceptOffer = () => {
        acceptOfferAPI(socket, {offerId: offerId}).then(r => {
            console.log(`Res r`)
            navigation.navigate('OffersTab')
        }).catch(e => console.log(e))
    }

    return (

        <Button style={styles.button}
                icon={props => <Ionicons {...props} name={'checkmark-circle'}/>}
                mode="outlined"
                onPress={() => acceptOffer()}>
            Accept
        </Button>

    )

}
export default AcceptOfferButton


const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        backgroundColor: colorScheme.background
    }
})
