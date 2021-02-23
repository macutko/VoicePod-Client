import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { colorScheme } from "../../constants/Colors"

const StarRating = (props) => {
	let topRating = 5
	let stars = []

	// add yellow stars
	for (let i = 0; i < topRating; i++) {
		stars.push(
			<Ionicons
				style={styles.star}
				key={`star_${i}`}
				color={i < props.rating ? colorScheme.yellow : colorScheme.placeholder}
				name={"star"}
			/>
		)
	}

	return (
		<View style={styles.container}>
			{stars}
			{props.reviews && <Text style={styles.reviews}>({props.reviews})</Text>}
		</View>
	)
}

export default StarRating

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
	},
	star: {
		fontSize: 21,
		marginRight: 1,
	},
	reviews: {
		fontSize: 17,
		marginLeft: 4,
		fontFamily: "Asap-Regular",
		color: colorScheme.placeholder,
	},
})
