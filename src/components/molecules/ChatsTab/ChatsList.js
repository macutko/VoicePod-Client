import React from "react";
import ChatListItem from "./ChatList.item";
import ItemListHOC from "../../atoms/ItemListHOC";
import {getChatsByUserIdAPI} from "../../../api/chat/getChatsByUserIdAPI";

export const ChatsList = (props) => {
    return (
        <ItemListHOC api={getChatsByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
                     listItem={ChatListItem} listItemProps={{mainNav: props.mainNav}}/>
    )
}
export default ChatsList
