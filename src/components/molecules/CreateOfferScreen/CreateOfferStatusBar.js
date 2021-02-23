import {Appbar} from "react-native-paper"
import React from "react"

export const CreateOfferStatusBar = ({navigation, title, allowSubmit, submit}) => {
	return (
		<Appbar.Header statusBarHeight={0}>
			<Appbar.BackAction
				onPress={() => navigation.goBack(null)}
			/>
			<Appbar.Content
				title={title}
			/>
			{allowSubmit && (
				<Appbar.Action
					icon="arrow-right"
					onPress={() => submit()}
				/>
			)}
		</Appbar.Header>
	)
}
export default CreateOfferStatusBar
