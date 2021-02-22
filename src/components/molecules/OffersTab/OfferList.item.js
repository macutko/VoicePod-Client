import React, {useContext, useEffect, useRef, useState} from "react"
import {StyleSheet} from "react-native";
import {Avatar, Divider, List} from "react-native-paper";
import {colorScheme} from "../../../constants/Colors";
import {SocketContext} from "../../atoms/SocketContext";
import {getOtherPartyDetailsByOfferIdAPI} from "../../../api/offer/getOtherPartyDetailsByOfferIdAPI";

const OfferListItem = ({mainNav, data}) => {
    const _isMounted = useRef(true);
    const context = useContext(SocketContext);
    const [user, setUser] = useState(null)

    useEffect(() => {
        getOtherPartyDetailsByOfferIdAPI(context.socket, {offerId: data.id}).then(res => {
            if (_isMounted) setUser(res)
        }).catch(e => console.log(e))
        return () => {
            _isMounted.current = false;
        }
    }, []);

    return (user != null ?
            <>

                <List.Item
                    onPress={() => mainNav.push('OfferScreen', {
                        offerId: data.id,
                        user: user
                    })}
                    title={user.firstName + ' ' + user.lastName}
                    left={props => <List.Icon {...props}
                                              style={styles.profilePic_noob}
                                              icon={props => <Avatar.Image source={{
                                                  uri: `data:image/${user.pictureType};base64,${user.profilePicture}`
                                              }}/>}/>}
                />

                <Divider style={styles.divider}/>
            </>
            : null


    )

}

export default OfferListItem

const styles = StyleSheet.create({
    divider: {
        height: 1
    },
    container_consultant: {
        backgroundColor: colorScheme.neutral,
        paddingVertical: 15
    },
    profileTitle_consultant: {
        paddingLeft: 10,
        color: colorScheme.background,
        fontWeight: "bold",
    },
    profileDesc_consultant: {
        paddingLeft: 10,
        color: colorScheme.background_subtle
    },
    profilePic_consultant: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
    },


    container_noob: {
        backgroundColor: colorScheme.background,
    },
    profileTitle_noob: {
        paddingLeft: 10,
        fontWeight: "bold",
        color: colorScheme.neutral
    },
    profileDesc_noob: {
        paddingLeft: 10,
        color: colorScheme.neutral_subtle
    },
    profilePic_noob: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",
    }

});
