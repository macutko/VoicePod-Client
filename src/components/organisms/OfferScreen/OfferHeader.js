import {Appbar} from "react-native-paper";
import React, {useState} from "react";
import OfferMenu from "./OfferMenu";

const OfferHeader = ({navigation, data}) => {
    const [menu, setMenu] = useState(false)

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack(null)}/>
                <Appbar.Content title={data.user.firstName + " " + data.user.lastName}/>
                <Appbar.Action icon="dots-vertical" onPress={() => setMenu(!menu)}/>
            </Appbar.Header>

            <OfferMenu toggleModal={() => setMenu(!menu)} visible={menu}/>
        </>
    )
}
export default OfferHeader
