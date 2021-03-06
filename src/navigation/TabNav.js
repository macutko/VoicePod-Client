import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs"
import {colorScheme} from "../constants/Colors"
import Ionicons from "react-native-vector-icons/Ionicons"


import React from "react"
import SettingsTab from "./SettingsNav"
import {SearchNavigator} from "./SearchNav"
import {ChatNav} from "./ChatNav"
import {OfferNav} from "./OfferNav"

const Nav = createMaterialBottomTabNavigator()

export const TabNav = (inheritance) => {
	return (
		<Nav.Navigator
			initialRouteName="SearchTab"
			activeColor={colorScheme.primary}
			inactiveColor={colorScheme.accent}
			barStyle={{backgroundColor: colorScheme.background}}
		>
			<Nav.Screen
				name="ChatsTab"
				options={{
					tabBarLabel: "Chats",
					tabBarIcon: ({color}) => (
						<Ionicons
							name={"chatbubble-ellipses"}
							size={26}
							color={color}
						/>
					),
				}}
			>
				{(props) => (
					<ChatNav
						{...inheritance}
						{...props}
						mainNav={inheritance.navigation}
					/>
				)}
			</Nav.Screen>
			<Nav.Screen
				name="OffersTab"
				options={{
					tabBarLabel: "Offers",
					tabBarIcon: ({color}) => (
						<Ionicons
							name={"list-circle"}
							size={26}
							color={color}
						/>
					),
				}}
			>
				{(props) => (
					<OfferNav
						{...inheritance}
						{...props}
						mainNav={inheritance.navigation}
					/>
				)}
			</Nav.Screen>
			<Nav.Screen
				name="SearchTab"
				options={{
					tabBarLabel: "Search",
					tabBarIcon: ({color}) => (
						<Ionicons name={"search"} size={26} color={color}/>
					),
				}}
			>
				{(props) => (
					<SearchNavigator
						{...inheritance}
						{...props}
						mainNav={inheritance.navigation}
					/>
				)}
			</Nav.Screen>

			<Nav.Screen
				name="SettingsTab"
				options={{
					tabBarLabel: "Settings",
					tabBarIcon: ({color}) => (
						<Ionicons name={"settings"} size={26} color={color}/>
					),
				}}
			>
				{(props) => (
					<SettingsTab
						{...inheritance}
						{...props}
						mainNav={inheritance.navigation}
					/>
				)}
			</Nav.Screen>
		</Nav.Navigator>
	)
}
