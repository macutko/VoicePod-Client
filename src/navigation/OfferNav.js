import React from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colorScheme} from "../constants/Colors";
import OffersTab from "../screens/tabs/OffersTab";

const OfferNav = createMaterialTopTabNavigator();

export const OfferNavigator = (inheritance) => {
    return (
        <OfferNav.Navigator
            initialRouteName="SearchTab"
            activeColor={colorScheme.primary}
            inactiveColor={colorScheme.accent}
            barStyle={{backgroundColor: colorScheme.background}}>
            <OfferNav.Screen
                name="Pending Offers"
                options={{tabBarLabel: "Pending",}}
            >
                {(props) => (
                    <OffersTab
                        {...inheritance}
                        {...props}
                    />
                )}
            </OfferNav.Screen>
            <OfferNav.Screen
                name="Resolved Offers"
                options={{tabBarLabel: "Resolved Offers",}}
            >
                {(props) => (
                    <OffersTab
                        {...inheritance}
                        {...props}
                    />
                )}
            </OfferNav.Screen>
        </OfferNav.Navigator>

    );
};

