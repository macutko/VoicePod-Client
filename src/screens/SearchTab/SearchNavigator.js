import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import UserProfile from "../../___________MainNav/SearchTab/UserProfile";
import SearchTab from "./SearchTab"

const SearchStack = createStackNavigator();

export const SearchTab = (inheritance) => {
    return (
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen name="SearchPage">
                {props => <SearchTab {...inheritance} {...props} />}
            </SearchStack.Screen>
            <SearchStack.Screen name="UserProfile">
                {props => <UserProfile {...inheritance} {...props}  />}
            </SearchStack.Screen>
        </SearchStack.Navigator>)
}