import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import SearchTab from "../screens/tabs/SearchTab";
import UserProfile from "../components/molecules/UserProfile";

const SearchStack = createStackNavigator();

export const SearchNavigator = (inheritance) => {
    return (
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen name="SearchPage">
                {(props) => <SearchTab {...inheritance} {...props} />}
            </SearchStack.Screen>
            <SearchStack.Screen name="UserProfile">
                {(props) => <UserProfile {...inheritance} {...props} />}
            </SearchStack.Screen>
        </SearchStack.Navigator>
    );
};
