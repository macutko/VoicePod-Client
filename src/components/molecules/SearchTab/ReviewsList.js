import {StyleSheet} from "react-native"
import {Review} from "../../atoms/Review"
import React, {useContext} from "react"
import {SocketContext} from "../../atoms/SocketContext"
import {getReviewsOfUserAPI} from "../../../api/review/getReviewsOfUserAPI"
import ItemListHOC from "../../atoms/ItemListHOC"

export const ReviewsList = ({username}) => {
	const context = useContext(SocketContext)

	return (
		<ItemListHOC api={getReviewsOfUserAPI} apiProps={{socket: context.socket, data: {username: username}}}
			listItem={Review} style={styles.reviewContainer}/>
	)
}

const styles = StyleSheet.create({
	reviewContainer: {
		width: "100%",
	},
})

