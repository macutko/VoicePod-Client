import React from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colorScheme} from "../constants/Colors";
import OffersList from "../components/molecules/OffersTab/OffersList";

const OffersTab = createMaterialTopTabNavigator();

export const OfferNav = (inheritance) => {
    return (
        <OffersTab.Navigator
            initialRouteName="SearchTab"
            activeColor={colorScheme.primary}
            inactiveColor={colorScheme.accent}
            barStyle={{backgroundColor: colorScheme.background}}>
            <OffersTab.Screen
                name="Pending Offers"
                options={{tabBarLabel: "Pending Offers",}}
            >
                {(props) => (
                    <OffersList
                        {...inheritance}
                        {...props}
                    />
                )}
            </OffersTab.Screen>
            <OffersTab.Screen
                name="Sent Offers"
                options={{tabBarLabel: "Sent Offers"}}
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

