import {Avatar, Divider, List} from "react-native-paper"
import React from "react"
import {StyleSheet} from "react-native"

export const Review = ({data}) => {
	return (
		<>
			<List.Item titleStyle={styles.profileTitle}
				style={styles.container}
				descriptionStyle={styles.profileDesc}
				title={data.from.firstName + " " + data.from.lastName}
				description={data.review}
				descriptionNumberOfLines={2}
				left={props => <List.Icon {...props}
					style={styles.profilePic}
					icon={props => <Avatar.Image
						source={{uri: `data:image/${data.from.pictureType};base64,${data.from.profilePicture}`}}/>}/>}
			/>
			<Divider/>
		</>
	)

}


const styles = StyleSheet.create({
	description: {
		paddingTop: 10,
		fontSize: 20,
		width: "80%",
		textAlign: "justify",
	},
	containerStyle: {
		paddingTop: 20,
	},
})
