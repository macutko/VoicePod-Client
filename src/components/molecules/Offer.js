import {StyleSheet, View} from "react-native"
import {Title} from "react-native-paper"
import React from "react"
import BufferedAudioPlayer from "../atoms/BufferedAudioPlayer"

const Offer = ({offerId, introSoundBits, problemSoundBits, budgetMinutes}) => {
	return (
		<View style={styles.offer_container}>
			<Title style={styles.container_theirs}>Who?</Title>

			<BufferedAudioPlayer fileName={`${offerId}_intro`} soundId={introSoundBits}/>

			<Title style={styles.container_theirs}>Problem?</Title>

			<BufferedAudioPlayer fileName={`${offerId}_problem`}
				soundId={problemSoundBits}/>

			<Title>Original budget: {budgetMinutes} minutes</Title>
		</View>
	)

}

const styles = StyleSheet.create({

	offer_container: {
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
	},
	container_theirs: {
		borderRadius: 50 / 2,
	},
})

export default Offer
