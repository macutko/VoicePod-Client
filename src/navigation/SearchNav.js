import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import UserProfile from "../components/molecules/UserProfile";

const SearchStack = createStackNavigator();

const SearchNav = (inheritance) => {
    return (
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen name="SearchTab">
                {props => <SearchTab {...inheritance} {...props} />}
            </SearchStack.Screen>
            <SearchStack.Screen name="UserProfile">
                {props => <UserProfile {...inheritance} {...props}  />}
            </SearchStack.Screen>
        </SearchStack.Navigator>)
}

export default SearchNav