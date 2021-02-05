import React from "react";
import ChatListItem from "../../components/molecules/ChatList.item";
import ItemListHOC from "../../components/atoms/ItemListHOC";
import {getChatsByUserIdAPI} from "../../api/chat/getChatsByUserIdAPI";

export const ChatsTab = (props) => {
    return (
        <ItemListHOC api={getChatsByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
                     listItem={ChatListItem} listItemProps={{mainNav: props.mainNav}}/>
    )
}
export default ChatsTab
