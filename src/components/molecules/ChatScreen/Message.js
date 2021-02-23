import React, {useContext} from "react"
import {StyleSheet, View} from "react-native"
import GlobalContext from "../../atoms/GlobalState"
import BufferedAudioPlayer from "../../atoms/BufferedAudioPlayer"


const Message = ({data}) => {
	const context = useContext(GlobalContext)
	const ownMessage = data.from.username === context.globalState.user.username

	return (
		<View style={{paddingTop: 10}}>
			<View style={ownMessage ? styles.ownMessage : styles.otherMessage}>
				<BufferedAudioPlayer
					fileName={`${data.id}_${data.chatId}`}
					soundId={data.sound}/>
			</View>
		</View>


	)
}

export default Message

const styles = StyleSheet.create({
	ownMessage: {
		width: "70%",
		alignSelf: "flex-end",
		marginBottom: 5,
	},
	otherMessage: {
		width: "70%",
		marginBottom: 5,
	},
})
