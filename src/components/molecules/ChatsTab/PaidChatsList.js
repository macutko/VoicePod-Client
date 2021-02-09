import React from "react";
import PaidChatListItem from "./PaidChatListItem";
import ItemListHOC from "../../atoms/ItemListHOC";
import {getPaidChatsByUserIdAPI} from "../../../api/chat/getPaidChatsByUserIdAPI";

export const PaidChatsList = (props) => {
    return (
        <ItemListHOC api={getPaidChatsByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
                     listItem={PaidChatListItem} listItemProps={{mainNav: props.mainNav}}/>
    )
}
export default PaidChatsList
