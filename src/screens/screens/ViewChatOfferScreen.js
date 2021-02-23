import React, {useEffect, useRef, useState} from "react"
import {StyleSheet, View} from "react-native"
import {ActivityIndicator, Appbar} from "react-native-paper"
import {getOfferFromChatAPI} from "../../api/chat/getOfferFromChatAPI"
import Offer from "../../components/molecules/Offer"
import {colorScheme} from "../../constants/Colors"

const ViewChatOfferScreen = (props) => {
	const [isFetching, setIsFetching] = useState(true)
	const [fetchedData, setFetchedData] = useState({})
	const _isMounted = useRef(true)


	useEffect(() => {
		return () => {
			_isMounted.current = false
		}
	}, [])


	useEffect(() => {
		if (isFetching) {
			getOfferFromChatAPI(props.socket, {chatId: props.route.params.chatId}).then(r => {
				if (_isMounted) {
					setFetchedData(r)
					setIsFetching(false)
					console.log(Object.keys(r))
				}
			}).catch(e => _isMounted ? setIsFetching(false) : null)
		}
	}, [isFetching])


	return (
		<>
			<Appbar.Header>
				<Appbar.BackAction
					onPress={() => props.navigation.goBack(null)}
				/>
				<Appbar.Content
					title={"Offer"}
				/>
			</Appbar.Header>

			<View style={styles.offerMessageContainer}>
				{isFetching ? <ActivityIndicator animating={true} color={colorScheme.accent}/> :
					<Offer data={fetchedData}/>}
			</View>
		</>
	)

}
export default ViewChatOfferScreen

const styles = StyleSheet.create({
	offerMessageContainer: {
		marginTop: 50,
	},
})
