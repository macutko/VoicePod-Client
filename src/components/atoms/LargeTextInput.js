import {TextInput} from "react-native-paper"
import React from "react"
import {StyleSheet} from "react-native"

const LargeTextInput = ({label, value, errorMessage, onChangeText}) => {
	return (
		<TextInput
			label={label}
			mode='outlined'
			autoCompleteType={"off"}
			textContentType={"none"}
			onChangeText={(text) =>
				onChangeText(text)
			}
			multiline={true}
			value={value}
			numberOfLines={10}
			errorMessage={errorMessage}
			style={styles.inputStyle}
		/>
	)
}
export default LargeTextInput

const styles = StyleSheet.create({
	inputStyle: {
		marginBottom: "5%",
	},

})
