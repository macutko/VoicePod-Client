import React from "react"
import {StyleSheet} from "react-native";
import {Avatar, Divider, List} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colorScheme} from "../../../constants/Colors";

const OfferListItem = ({mainNav, data}) => {

    return (
        <>
            <List.Item
                titleStyle={styles.profileTitle_consultant}
                style={styles.container_consultant}
                descriptionStyle={styles.profileDesc_consultant}
                onPress={() => mainNav.push('OfferScreen', {
                    data
                })}
                title={data.user.firstName + ' ' + data.user.lastName}
                right={props => <List.Icon {...props}
                                           icon={props => <Ionicons {...props}
                                                                    style={data.isCustomer ? {color: colorScheme.background} : {color: colorScheme.neutral}}
                                                                    name={data.isCustomer ? 'book' : 'cash'}/>}/>}
                left={props => <List.Icon {...props}
                                          style={styles.profilePic_noob}
                                          icon={props => <Avatar.Image source={{
                                              uri: `data:image/${data.user.pictureType};base64,${data.user.profilePicture}`
                                          }}/>}/>}
            />
            <Divider style={styles.divider}/>
        </>


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
