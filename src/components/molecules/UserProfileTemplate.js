import React from "react";
import { StyleSheet, View } from "react-native";
import { colorScheme } from "../../constants/Colors";
import AvatarCustom from "../atoms/AvatarCustom";
import Metrics from "../atoms/Metrics";
import StarRating from "../atoms/StarRating";
import TitleCustom from "../atoms/TitleCustom";

const UserProfileTemplate = (props) => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarColorStripe}>
                    <View style={styles.avatar}>
                        <AvatarCustom size={180} />
                    </View>
                </View>
            </View>

            <TitleCustom center>
                {props.firstName} {props.lastName}
            </TitleCustom>
            <StarRating rating={props.rating} />
            <Metrics
                reviews={props.reviews}
                cases={props.cases}
                budget={props.budget}
            />
            {props.children}
        </View>
    );
};
export default UserProfileTemplate;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colorScheme.background,
        paddingHorizontal: "5%",
    },
    avatarContainer: {
        height: 220,
        width: "112%",
        flexDirection: "row",
    },
    avatarColorStripe: {
        backgroundColor: colorScheme.primary,
        height: 160,
        width: "100%",
        alignItems: "center",
    },
    avatar: {
        marginTop: 30,
    },
});
