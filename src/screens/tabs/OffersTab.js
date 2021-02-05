import React from "react";
import OfferListItem from "../../components/molecules/OfferList.item";
import {getOffersByUserId} from "../../api/offer/getOffers";
import ItemListHOC from "../../components/molecules/ItemListHOC";

export const OffersTab = (props) => {
    return (
        <ItemListHOC api={getOffersByUserId} apiProps={{socket: props.socket, data: {}}} listItem={OfferListItem}
                     listItemProps={{mainNav: props.mainNav}}/>

    )
}

export default OffersTab
