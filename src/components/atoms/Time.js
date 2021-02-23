import React from "react"
import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { colorScheme } from "../../constants/Colors"

const Time = (props) => {
	return (
		<Text
			style={styles.time}
		>
			{props.time.toLocaleTimeString().slice(0, -3) }
		</Text>
	)
}
export default Time

const styles = StyleSheet.create({
	time: {
		color: colorScheme.placeholder,
		fontSize: 16,
	},
})
