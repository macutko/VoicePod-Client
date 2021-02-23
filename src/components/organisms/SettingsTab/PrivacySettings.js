import React from "react"
import {StyleSheet} from "react-native"
import {List} from "react-native-paper"

export default class PrivacySettings extends React.Component {


	render() {
		return (

			<List.Section>
				{/*
                    Notifications???
            */}
				<List.Subheader>Privacy</List.Subheader>

			</List.Section>


		)
	}
}


const styles = StyleSheet.create({
	profile: {
		paddingBottom: 10,
		fontSize: 30,
		fontWeight: "bold",
	},
	profilePic: {
		height: 70,
	},

})
