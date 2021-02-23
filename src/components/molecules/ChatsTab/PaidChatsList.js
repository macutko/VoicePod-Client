import React from "react"

import ItemListHOC from "../../atoms/ItemListHOC"
import {getPaidChatsByUserIdAPI} from "../../../api/chat/getPaidChatsByUserIdAPI"
import PaidChatListItem from "./PaidChatListItem"

export const PaidChatsList = (props) => {
	return (
		<ItemListHOC api={getPaidChatsByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
			listItem={PaidChatListItem} listItemProps={{mainNav: props.mainNav}}/>
	)
}
export default PaidChatsList
