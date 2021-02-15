import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/screens/LoginScreen";
// import { SignupScreen } from "../screens/screens/SignupScreen";

const LandingStack = createStackNavigator();

export const LandingNav = (inheritance) => {
  return (
    <LandingStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Here will go other screens before login - like welcome carousel */}
      <LandingStack.Screen name="LoginScreen">
        {(props) => <LoginScreen {...inheritance} {...props} />}
      </LandingStack.Screen>
      {/* <LandingStack.Screen name="SignupScreen">
        {(props) => <SignupScreen {...inheritance} {...props} />}
      </LandingStack.Screen> */}
    </LandingStack.Navigator>
  );
};
