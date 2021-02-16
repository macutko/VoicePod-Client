import React from "react";
import OfferListItem from "./OfferList.item";
import ItemListHOC from "../../atoms/ItemListHOC";
import {getPendingOffersByUserIdAPI} from "../../../api/offer/getPendingOffersByUserIdAPI";

export const PendingOffersList = (props) => {

    return (
        <ItemListHOC api={getPendingOffersByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
                     listItem={OfferListItem}
                     listItemProps={{mainNav: props.mainNav}}/>

    )
}

export default PendingOffersList
