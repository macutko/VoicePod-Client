import React from "react";
import {Menu} from "react-native-paper";
import Divider from "react-native-paper/src/components/Divider";
import {Dimensions} from "react-native";

const InChatMenu = ({navigation, closeChat, toggleMenu, isVisible, chatId}) => {
    // {/* Menu takes so long to open. Needs to be fixed.  */}
    return (
        <Menu
            visible={isVisible}
            onDismiss={() => toggleMenu()}
            // anchor could be also Appbar.Action button
            // to avoid nesting it into menu, absolute positioning is used
            anchor={{x: Dimensions.get("window").width, y: 0}}
        >
            <Menu.Item onPress={() => {
            }} title="Block"/>
            <Menu.Item onPress={() => {
            }} title="Report"/>
            <Menu.Item onPress={() => {
                closeChat()
            }} title="Close & leave review"/>
            <Menu.Item onPress={() => {
            }} title="Add to homescreen"/>
            {/*<Menu.Item onPress={() => {}} title="Mute notifications" />*/}
            <Divider/>
            <Menu.Item
                onPress={() => {
                    toggleMenu();
                    navigation.navigate("ViewChatOfferScreen", {
                        chatId: chatId
                    });
                }}
                title="View offer"
            />
        </Menu>

    )
}

export default InChatMenu
