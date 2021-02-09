import React from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colorScheme} from "../../constants/Colors";
import OffersList from "../../components/molecules/OffersTab/OffersList";

const OffersTab = createMaterialTopTabNavigator();

export const OfferNavigator = (inheritance) => {
    return (
        <OffersTab.Navigator
            initialRouteName="SearchTab"
            activeColor={colorScheme.primary}
            inactiveColor={colorScheme.accent}
            barStyle={{backgroundColor: colorScheme.background}}>
            <OffersTab.Screen
                name="Pending Offers"
                options={{tabBarLabel: "Pending",}}
            >
                {(props) => (
                    <OffersList
                        {...inheritance}
                        {...props}
                    />
                )}
            </OffersTab.Screen>
            <OffersTab.Screen
                name="Resolved Offers"
                options={{tabBarLabel: "Resolved Offers",}}
            >
                {(props) => (
                    <OffersList
                        {...inheritance}
                        {...props}
                    />
                )}
            </OffersTab.Screen>
        </OffersTab.Navigator>

    );
};

