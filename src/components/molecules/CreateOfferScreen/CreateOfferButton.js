import {Button} from "react-native-paper";
import {colorScheme} from "../../../constants/Colors";
import {StyleSheet} from "react-native";
import React, {useContext} from "react";
// import stripe from "tipsi-stripe";
import {createOfferAPI} from "../../../api/offer/createOfferAPI";
import {SocketContext} from "../../atoms/SocketContext";

// stripe.setOptions({
//     publishableKey:
//         "pk_test_51IDSTZECU7HrwjM1mvfNnY2spqwoSGu9rAKZYia8Egd4QRruVp9S6HIUaPi1WEWWDM8sEcNMN5r4fioXDibqBvi4008TNJG6Xe",
//     androidPayMode: "test", // Android only
// })

export const CreateOfferButton = ({navigation, username, intro, problem, budget}) => {
    const context = useContext(SocketContext);

    const submit = () => {
        createOfferAPI(
            context.socket, {
                username: username,
                intro: intro,
                problem: problem,
                budget: budget,
            }).then(res => {
            // stripe.confirmPaymentIntent({clientSecret: res.clientSecret})
            //     .then((r) => {
            //         console.log(r);
            //         navigation.navigate("TabNavWrapper", {
            //             screen: "OffersTab",
            //         });
            //     })
            //     .catch((e) => {
            //         console.log(e);
            //     });
        }).catch(e => console.log(e))
    }

    return (
        <Button
            mode="contained"
            labelStyle={styles.buttonStyleLabel}
            onPress={() => submit()}
            style={styles.buttonStyle}
            color={colorScheme.secondary}
            contentStyle={styles.buttonContentStyle}
        >
            Submit Offer
        </Button>
    )
}
export default CreateOfferButton;


const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 10,
    },
    buttonContentStyle: {
        width: 200,
        height: 50,
    },
    buttonStyleLabel: {
        fontSize: 18,
    },
});
