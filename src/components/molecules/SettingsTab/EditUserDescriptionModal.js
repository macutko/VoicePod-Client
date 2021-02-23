import {Button, Modal, Portal, TextInput} from "react-native-paper"
import React, {useContext, useState} from "react"
import {StyleSheet} from "react-native"
import GlobalContext from "../../atoms/GlobalState"

const EditUserDescriptionModal = ({visible, close, submit}) => {
	const context = useContext(GlobalContext)
	const [description, setDescription] = useState(context.globalState.user.description)

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={() => close()}
				animationType="fade"
				contentContainerStyle={styles.modalStyle}
			>
				<TextInput
					multiline={true}
					label="BIO"
					mode='outlined'
					onChangeText={(text) => setDescription(text)}
					autoCompleteType={"off"}
					style={styles.inputStyle}
					value={description}
				/>

				<Button mode="outlined" onPress={() => submit({
					description: description,
				})} style={styles.buttonStyle}>
                    Update
				</Button>

			</Modal>
		</Portal>
	)
}

export default EditUserDescriptionModal


const styles = StyleSheet.create({
	modalStyle: {backgroundColor: "white", padding: 20, marginHorizontal: "5%"},
	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
	},
	inputStyle: {
		marginBottom: "5%",
	},
})
