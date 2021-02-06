import OfferScreenSlider from "./OfferScreenSlider";
import React from "react";

export const HoursSlider = ({returnHours}) => {
    const changeHours = (e) => {
        if (e > 10) {
            e = 10;
        }
        if (e < 0) {
            e = 0;
        }
        let h = Math.round(e);
        returnHours(h)

    };

    return (<OfferScreenSlider label={'Hours'} minimumValue={0} maximumValue={10} defaultValue={0}
                               changeValue={changeHours}/>)
}

export default HoursSlider
