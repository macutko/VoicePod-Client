import CreateOfferSlider from "./CreateOfferSlider"
import React from "react"

export const MinutesSlider = ({returnMinutes}) => {
	const changeMinutes = (e) => {
		if (e > 60) {
			e = 60
		}
		if (e < 5) {
			e = 5
		}
		let m = Math.round(e)
		returnMinutes(m)

	}


	return (<CreateOfferSlider label={"Minutes"} minimumValue={5} maximumValue={60} defaultValue={5}
		changeValue={changeMinutes}/>)
}

export default MinutesSlider
