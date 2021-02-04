import {FlatList, RefreshControl, StyleSheet} from "react-native";
import {Review} from "../../atoms/Review";
import React, {useContext, useEffect, useRef, useState} from "react";
import {SocketContext} from "../../atoms/SocketContext";
import {getReviewsOfUser} from "../../../api/getReviewsOfUser";
import {ActivityIndicator} from "react-native-paper";
import {colorScheme} from "../../../constants/Colors";

export const ReviewsList = ({username}) => {
    const [isFetching, setIsFetching] = useState(true);
    const [reviews, setReviews] = useState([]);
    const context = useContext(SocketContext);
    const _isMounted = useRef(true);

    useEffect(() => {
        return () => { // ComponentWillUnmount in Class Component
            _isMounted.current = false;
        }
    }, []);
    useEffect(() => {
        let unmounted = false;
        if (isFetching) {
            getReviewsOfUser(context.socket, {username: username}).then(r => {
                if (_isMounted.current) {
                    setReviews(r)
                    setIsFetching(false)
                }
            }).catch(e => setIsFetching(false))
        }
    }, [isFetching]);

    return (
        !isFetching ?
            <>
                <FlatList
                    data={reviews}
                    style={styles.reviewContainer}

                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={() => setIsFetching(true)}
                        />
                    }
                    renderItem={({item}) => (
                        <Review data={item}/>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </>
            : <ActivityIndicator animating={true} color={colorScheme.accent}/>

    )
}
const styles = StyleSheet.create({
    reviewContainer: {
        width: "100%",
    }
})
