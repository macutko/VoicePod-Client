import React from "react"
import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native"
import { colorScheme } from "../../../constants/Colors"
import Ionicons from "react-native-vector-icons/Ionicons"

const SearchboxCustom = (props) => {
	return (
		<View style={styles.searchSection}>
			<Ionicons style={styles.searchIcon} name="ios-search" />
			<TextInput
				value={props.value}
				onChangeText={props.onChangeText}
				style={styles.input}
				placeholder={props.placeholder}
				placeholderTextColor={colorScheme.dark_grey}
				selectionColor={colorScheme.black}
			/>
		</View>
	)
}

export default SearchboxCustom

const styles = StyleSheet.create({
	searchSection: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		marginVertical: 10,
		backgroundColor: "transparent",
		borderBottomColor: "black",
		borderStyle: "solid",
		borderBottomWidth: 2,
	},
	searchIcon: {
		padding: 10,
		color: colorScheme.black,
		fontSize: 35,
	},
	input: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		height: 50,
		backgroundColor: "transparent",
		fontSize: 20,
	},
})
