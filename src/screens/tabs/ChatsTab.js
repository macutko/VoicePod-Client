import React from "react";
import ChatListItem from "../../components/molecules/ChatList.item";
import ItemListHOC from "../../components/molecules/ItemListHOC";
import {getChatsByUserId} from "../../api/chat/getChatsByUserId";

export const ChatsTab = (props) => {
    return (
        <ItemListHOC api={getChatsByUserId} apiProps={{socket: props.socket, data: {}}}
                     listItem={ChatListItem} listItemProps={{mainNav: props.mainNav}}/>
    )
}
export default ChatsTab
