import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colorScheme } from "../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const StarRating = (props) => {
    let topRating = 5;
    let stars = [];

    // add yellow stars
    for (let i = 0; i < topRating; i++) {
        stars.push(
            <Ionicons
                style={styles.star}
                key={`star_${i}`}
                color={
                    i < props.rating
                        ? colorScheme.yellow
                        : colorScheme.dark_grey
                }
                name={"star"}
            />
        );
    }

    return (
        <View style={styles.container}>
            {stars}
            <Text style={styles.reviews}>(300 reviews)</Text>
        </View>
    );
};

export default StarRating;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 6,
        flexDirection: "row",
    },
    star: {
        fontSize: 22,
    },
    reviews: {
        paddingTop: 4,
        paddingLeft: 4,
    },
});
