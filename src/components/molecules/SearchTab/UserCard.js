import React from "react"
import {StyleSheet, View} from "react-native"
import {TouchableOpacity} from "react-native-gesture-handler"
import {Badge, Divider, Text} from "react-native-paper"
import Ionicons from "react-native-vector-icons/Ionicons"
import {colorScheme} from "../../../constants/Colors"
import AvatarCustom from "../../atoms/AvatarCustom"
import StarRating from "../../atoms/StarRating"
import Time from "../../atoms/Time"

const UserCard = (props) => {
	// console.log(props);
	return (
		<TouchableOpacity onPress={() => props.onPress()}>
			<View style={styles.container}>
				<AvatarCustom
					size={55}
					pictureType={props.user.pictureType}
					profilePicture={props.user.profilePicture}
				/>
				<View style={styles.middle}>
					<Text style={styles.name}>
						{props.user.firstName} {props.user.lastName}
					</Text>
					{/* For later use */}
					{/* <Text style={styles.title}>{props.user.title}</Text> */}
					<StarRating rating={3} reviews={25}/>
				</View>

				<View style={styles.right}>
					<View style={styles.rightText}>
						{props.time ? <Time time={props.time}/> : <Text style={styles.title}>View profile</Text>}
						<Ionicons style={styles.icon} name={"chevron-forward"}/>
					</View>

					{props.user.price && <Text style={styles.price}>{props.user.price}p/min</Text>}
					{props.messages && <Badge style={styles.messages} size={25}>{props.messages}</Badge>}
				</View>
			</View>
			<Divider/>
		</TouchableOpacity>
	)
}

export default UserCard

const styles = StyleSheet.create({
	container: {
		backgroundColor: colorScheme.grey,
		height: 65,
		flexDirection: "row",
		marginVertical: 5,
		paddingVertical: 5,
	},
	middle: {
		flexDirection: "column",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
	name: {
		fontSize: 22,
	},
	title: {
		fontSize: 14,
		color: colorScheme.placeholder,
	},
	right: {
		flex: 1,
		paddingVertical: 5,
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
	price: {
		color: colorScheme.accent,
		fontWeight: "bold",
		fontSize: 20,
		marginRight: 4,
	},
	icon: {
		fontSize: 20,
		marginLeft: -2,
		marginBottom: -2,
		color: colorScheme.placeholder,
	},
	rightText: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 4,
	},
	messages: {
		backgroundColor: colorScheme.accent,
		marginRight: 3,
		color: colorScheme.background,
		fontWeight: "bold",
	},
})
