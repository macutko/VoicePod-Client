import React from "react"
import {Image, StyleSheet} from "react-native"
import Title from "react-native-paper/src/components/Typography/Title"
import CreateOfferTemplate from "../../components/organisms/CreateOfferScreen/CreateOfferTemplate"

export const IntroCreateOfferScreen = (props) => {

	const submit = (voiceClip) => {
		props.navigation.navigate("ProblemCreateOfferScreen", {
			...props.route.params,
			intro: voiceClip,
		})
	}


	return (
		<CreateOfferTemplate
			{...props}
			submit={(voiceClip) => submit(voiceClip)}
			current={"IntroCreateOfferScreen"}
			description={"Press and hold the microphone and speak for 1 minute."}
			title={"Intro"}
		>
			<>
				<Image
					style={styles.image}
					source={require("../../assets/images/intro.png")}
				/>
				<Title style={styles.title}>Who are you?</Title>
			</>
		</CreateOfferTemplate>
	)

}
export default IntroCreateOfferScreen

const styles = StyleSheet.create({
	image: {
		resizeMode: "contain",
		flex: 0.7,
	},
	title: {
		fontSize: 30,
	},
	description: {
		fontSize: 13,
	},
})
