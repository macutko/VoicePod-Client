import React from "react";
import PaidChatListItem from "./PaidChatListItem";
import ItemListHOC from "../../atoms/ItemListHOC";
import {getFreeChatsByUserIdAPI} from "../../../api/chat/getFreeChatsByUserIdAPI";

export const FreeChatsList = (props) => {
    return (
        <ItemListHOC api={getFreeChatsByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
                     listItem={PaidChatListItem} listItemProps={{mainNav: props.mainNav}}/>
    )
}
export default FreeChatsList
