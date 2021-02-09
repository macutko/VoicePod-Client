import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";
import {colorScheme} from "../../../constants/Colors";
import Offer from "../../molecules/Offer";
import {StyleSheet, View} from "react-native";
import AcceptOfferButton from "../../molecules/OfferScreen/AcceptOfferButton";
import RejectOfferButton from "../../molecules/OfferScreen/RejectOfferButton";
import Title from "react-native-paper/src/components/Typography/Title";
import {getOfferByIdAPI} from "../../../api/offer/getOfferByIdAPI";
import React, {useEffect, useRef, useState} from "react";

const OfferBody = (props) => {

    const _isMounted = useRef(true);
    const [isFetching, setIsFetching] = useState(true)
    const [offer, setOffer] = useState({})


    useEffect(() => {
        getOfferByIdAPI(props.socket, {offerId: props.route.params.data.id}).then(res => {
            if (_isMounted) {
                setIsFetching(false)
                setOffer(res)
            }
        }).catch(e => {
            if (_isMounted) {
                setIsFetching(false)
                setOffer({})

            }
            console.log(e)
        })

        return () => {
            _isMounted.current = false;
        }
    }, []);


    return (
        <View style={{flexDirection: "column"}}>
            {isFetching ? <ActivityIndicator animating={true} color={colorScheme.accent}/> :
                <>
                    <Offer data={offer}/>

                    {!offer.accepted && !props.route.params.data.isCustomer ?
                        <View style={styles.mainContainer}>
                            <View style={styles.container}>
                                <AcceptOfferButton navigation={props.navigation} socket={props.socket}
                                                   offerId={props.route.params.data.id}/>
                                <RejectOfferButton navigation={props.navigation} socket={props.socket}
                                                   offerId={props.route.params.data.id}/>
                            </View>
                        </View>

                        :

                        null
                    }

                    {
                        offer.accepted && props.route.params.data.isCustomer ?

                            <>
                                <Title>
                                    Consultant accepted but the payment must have not gone through. Please try to
                                    pay again by pressing....</Title>
                                {/*    TODO: payments*/}
                            </>
                            :
                            null
                    }

                    {
                        offer.accepted && !props.route.params.data.isCustomer ?

                            <>
                                <Title>
                                    You have accepted but the customer has not confirmed his payment.
                                </Title>
                            </>
                            :
                            null
                    }

                    {/*    TODO: UI add cancel option*/}
                </>
            }

        </View>
    )
}
export default OfferBody

const styles = StyleSheet.create({
    offer_container: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "75%",
    },
    mainContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingHorizontal: "5%",
        marginTop: 20
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
})
