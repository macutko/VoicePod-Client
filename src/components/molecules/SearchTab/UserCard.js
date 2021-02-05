import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Text } from "react-native-paper";
import { colorScheme } from "../../../constants/Colors";
import StarRating from "../../atoms/StarRating";

const UserCard = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()}>
            <View style={styles.container}>
                <Avatar.Image
                    style={styles.avatar}
                    key={`avatar_${props.number}`}
                    source={
                        props.user.pictureType
                            ? {
                                  uri: `data:image/${props.user.pictureType};base64,${props.user.profilePicture}`,
                              }
                            : require("../../../assets/images/avatar.png")
                    }
                />
                <View style={styles.content}>
                    <Text style={styles.name}>
                        {props.user.firstName} {props.user.lastName}
                    </Text>
                    <Text style={styles.description}>
                        {props.user.description}
                    </Text>
                    <StarRating rating={3} />
                    <Text style={styles.link}>
                        Checkout {props.user.firstName}'s profile >>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorScheme.grey,
        height: 120,
        flexDirection: "row",
        marginVertical: 5,
    },
    avatar: {
        margin: 6,
    },
    content: {
        flexDirection: "column",
        padding: 6,
        flex: 1,
    },
    name: {
        fontSize: 20,
    },
    description: {
        padding: 0,
        fontSize: 13,
    },
    link: {
        alignSelf: "flex-end",
        paddingTop: 4,
    },
});
