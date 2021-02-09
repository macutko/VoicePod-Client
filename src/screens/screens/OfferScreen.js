import React from "react"
import OfferHeader from "../../components/organisms/OfferScreen/OfferHeader";
import OfferBody from "../../components/organisms/OfferScreen/OfferBody";

const OfferScreen = (props) => {


    return (
        <>
            <OfferHeader navigation={props.navigation} data={props.route.params.data.user}/>
            <OfferBody {...props} />
        </>


    );

}
export default OfferScreen

