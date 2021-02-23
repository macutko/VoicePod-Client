import React from "react"
import { StyleSheet, View } from "react-native"
import { Chip } from "react-native-paper"
import { colorScheme } from "../../constants/Colors"


// TODO: add responsibility when many tags
const Tags = (props) => {
	return (
		<View style={styles.container}>
			{props.tagsList.map((tag, i) => (
				<Chip key={i} style={styles.tag}>{tag}</Chip>
			))}
		</View>
	)
}
export default Tags

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	tag: {
		backgroundColor: colorScheme.surface,
	},
})
