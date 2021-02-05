import {StyleSheet} from "react-native";
import {Review} from "../../atoms/Review";
import React, {useContext} from "react";
import {SocketContext} from "../../atoms/SocketContext";
import {getReviewsOfUser} from "../../../api/review/getReviewsOfUser";
import ItemListHOC from "../ItemListHOC";

export const ReviewsList = ({username}) => {
    const context = useContext(SocketContext);

    return (
        <ItemListHOC api={getReviewsOfUser} apiProps={{socket: context.socket, data: {username: username}}}
                     listItem={Review} style={styles.reviewContainer}/>
    )
}

const styles = StyleSheet.create({
    reviewContainer: {
        width: "100%",
    }
})

