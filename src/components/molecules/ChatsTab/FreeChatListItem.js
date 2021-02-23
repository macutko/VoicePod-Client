import React, {useContext, useEffect, useRef, useState} from "react"
import {StyleSheet} from "react-native"
import {Avatar, Divider, List} from "react-native-paper"
import {getOtherPartyDetailsByChatIdAPI} from "../../../api/chat/getOtherPartyDetailsByChatIdAPI"
import {SocketContext} from "../../atoms/SocketContext"

const FreeChatListItem = ({mainNav, data}) => {
	const _isMounted = useRef(true)
	const context = useContext(SocketContext)
	const [user, setUser] = useState(null)

	useEffect(() => {
		getOtherPartyDetailsByChatIdAPI(context.socket, {chatId: data.id}).then(res => {
			if (_isMounted) setUser(res)
		}).catch(e => console.log(e))
		return () => {
			_isMounted.current = false
		}
	}, [])

	return (user !== null ?
		<>

			<List.Item
				onPress={() => mainNav.push("ChatScreen", {
					chatId: data.id,
				})}
				title={user.firstName + " " + user.lastName}
				left={props => <List.Icon {...props}
					style={styles.profilePic_noob}
					icon={props => <Avatar.Image source={{
						uri: `data:image/${user.pictureType};base64,${user.profilePicture}`,
					}}/>}/>}
			/>
			<Divider style={styles.divider}/>
		</> : null
	)

}
export default FreeChatListItem


const styles = StyleSheet.create({
	divider: {
		height: 1,
	},
	profilePic_noob: {
		paddingLeft: 5,
		alignItems: "center",
		justifyContent: "center",
	},

})
