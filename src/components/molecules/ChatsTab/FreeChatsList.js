import React from "react"
import ItemListHOC from "../../atoms/ItemListHOC"
import {getFreeChatsByUserIdAPI} from "../../../api/chat/getFreeChatsByUserIdAPI"
import FreeChatListItem from "./FreeChatListItem"

export const FreeChatsList = (props) => {
	return (
		<ItemListHOC api={getFreeChatsByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
			listItem={FreeChatListItem} listItemProps={{mainNav: props.mainNav}}/>
	)
}
export default FreeChatsList
