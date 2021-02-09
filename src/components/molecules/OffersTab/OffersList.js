import React from "react";
import OfferListItem from "./OfferList.item";
import {getOffersByUserIdAPI} from "../../../api/offer/getOffersByUserIdAPI";
import ItemListHOC from "../../atoms/ItemListHOC";

export const OffersList = (props) => {

    return (
        <ItemListHOC api={getOffersByUserIdAPI} apiProps={{socket: props.socket, data: {}}} listItem={OfferListItem}
                     listItemProps={{mainNav: props.mainNav}}/>

    )
}

export default OffersList
