import React from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colorScheme} from "../constants/Colors";
import PendingOffersList from "../components/molecules/OffersTab/PendingOffersList";
import SentOffersList from "../components/molecules/OffersTab/SentOffersList";
import ResolvedOffersList from "../components/molecules/OffersTab/ResolvedOffersList";

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
                    <PendingOffersList
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
                    <SentOffersList
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
                    <ResolvedOffersList
                        {...inheritance}
                        {...props}
                    />
                )}
            </OffersTab.Screen>
        </OffersTab.Navigator>

    );
};

