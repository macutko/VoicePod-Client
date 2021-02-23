import React from "react"
import OfferListItem from "./OfferList.item"
import ItemListHOC from "../../atoms/ItemListHOC"
import {getSentOffersByUserIdAPI} from "../../../api/offer/getSentOffersByUserIdAPI"

export const SentOffersList = (props) => {

	return (
		<ItemListHOC api={getSentOffersByUserIdAPI} apiProps={{socket: props.socket, data: {}}} listItem={OfferListItem}
			listItemProps={{mainNav: props.mainNav}}/>

	)
}

export default SentOffersList
