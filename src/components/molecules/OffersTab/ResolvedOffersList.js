import React from "react"
import OfferListItem from "./OfferList.item"
import ItemListHOC from "../../atoms/ItemListHOC"
import {getResolvedOffersByUserIdAPI} from "../../../api/offer/getResolvedOffersByUserIdAPI"

export const ResolvedOffersList = (props) => {

	return (
		<ItemListHOC api={getResolvedOffersByUserIdAPI} apiProps={{socket: props.socket, data: {}}}
			listItem={OfferListItem}
			listItemProps={{mainNav: props.mainNav}}/>

	)
}

export default ResolvedOffersList
