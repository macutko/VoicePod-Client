import React from "react";
import OfferListItem from "../../components/molecules/OfferList.item";
import {getOffersByUserIdAPI} from "../../api/offer/getOffersByUserIdAPI";
import ItemListHOC from "../../components/atoms/ItemListHOC";

export const OffersTab = (props) => {
    return (
        <ItemListHOC api={getOffersByUserIdAPI} apiProps={{socket: props.socket, data: {}}} listItem={OfferListItem}
                     listItemProps={{mainNav: props.mainNav}}/>

    )
}

export default OffersTab
