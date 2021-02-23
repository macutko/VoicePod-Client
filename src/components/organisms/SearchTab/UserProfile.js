import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "react-native-paper/src/components/Typography/Text"
import { getCheckDefaultPaymentMethodAPI } from "../../../api/getCheckDefaultPaymentMethodAPI"
import { colorScheme } from "../../../constants/Colors"
import ButtonCustom from "../../atoms/ButtomCustom"
import Tags from "../../atoms/Tags"
import UserProfileTemplate from "../../molecules/UserProfileTemplate"

const UserProfile = (props) => {
	const _isMounted = useRef(true)
	const [showDialog, setShowDialog] = useState(false)

	useEffect(() => {
		return () => {
			// ComponentWillUnmount in Class Component
			_isMounted.current = false
		}
	}, [])

	const navigateToOfferCreation = () => {
		getCheckDefaultPaymentMethodAPI(props.socket)
			.then((r) => {
				if (r) {
					props.mainNav.navigate("IntroCreateOfferScreen", {
						...props.route.params,
					})
				} else {
					if (_isMounted) setShowDialog(!showDialog)
				}
			})
			.catch((e) => console.log(e))
	}

	const tags = ["HTML", "Design", "react", "figma"]

	return (
		<UserProfileTemplate
			firstName={props.route.params.firstName}
			lastName={props.route.params.lastName}
			rating={4}
			reviews={48}
			cases={12}
			budget={50}
		>
			<Tags tagsList={tags} />
			<View style={styles.descriptionContainer}>
				<Text>{props.route.params.description}</Text>
				<Text style={styles.usernameHandle}>
          @{props.route.params.username}
				</Text>
			</View>
			<View style={styles.buttons}>
				<ButtonCustom half onPress={() => navigateToOfferCreation()}>
          Add Review
				</ButtonCustom>
				<ButtonCustom half>Send Offer</ButtonCustom>
			</View>

			{/* <StartFreeChat
        mainNav={props.mainNav}
        username={props.route.params.username}
      />

      <ReviewsList username={props.route.params.username} />

      <AddPaymentWarning
        toggleDialog={_isMounted ? () => setShowDialog(!showDialog) : null}
        navigation={props.navigation}
        showDialog={showDialog}
      /> */}
		</UserProfileTemplate>
	)
}
export default UserProfile

const styles = StyleSheet.create({
	descriptionContainer: {
		fontSize: 14,
		paddingVertical: 15,
		width: "100%",
		alignItems: "center",
	},
	usernameHandle: {
		fontSize: 15,
		paddingTop: 10,
		color: colorScheme.placeholder,
		alignSelf: "flex-end",
		fontStyle: "italic",
	},

	buttons: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		marginVertical: 10,
	},
})
