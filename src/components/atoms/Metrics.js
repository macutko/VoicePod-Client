import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Divider } from "react-native-paper"
import { colorScheme } from "../../constants/Colors"

const Metrics = (props) => {
	return (
		<View style={styles.container}>
			<Divider />
			<View style={styles.content}>
				{props.reviews && (
					<View style={styles.item}>
						<Text style={styles.value}>{props.reviews}</Text>
						<Text style={styles.label}>Reviews</Text>
					</View>
				)}

				{props.cases && (
					<View style={styles.item}>
						<Text style={styles.value}>{props.cases}</Text>
						<Text style={styles.label}>Cases</Text>
					</View>
				)}

				{props.budget && (
					<View style={styles.item}>
						<Text style={styles.value}>{props.budget}p</Text>
						<Text style={styles.label}>Budget</Text>
					</View>
				)}

				{props.minutes && (
					<View style={styles.item}>
						<Text style={styles.value}>{props.minutes}</Text>
						<Text style={styles.label}>Minutes</Text>
					</View>
				)}


				{props.total && (
					<View style={styles.item}>
						<Text style={styles.value}>{props.total}</Text>
						<Text style={styles.label}>Total</Text>
					</View>
				)}

				{props.expires && (
					<View style={styles.item}>
						<Text style={styles.value}>{props.expires}</Text>
						<Text style={styles.label}>Expires</Text>
					</View>
				)}
			</View>
			<Divider />
		</View>
	)
}
export default Metrics

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		width: "100%",
	},
	content: {
		flexDirection: "row",
		justifyContent: "space-around",
		height: 80,
	},
	item: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 15,
	},
	value: {
		color: colorScheme.accent,
		fontWeight: "bold",
		fontSize: 24,
		marginRight: 4,
	},
})
