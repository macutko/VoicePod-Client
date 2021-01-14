import React from 'react';
import GlobalContext from "./GlobalState";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native-web";
import {WelcomeScreen} from "./WelcomeScreen/WelcomeScreen";
import {TabNavWrapper} from "./LandingPage/TabNavWrapper";
import {getFromMemory} from "./helpers/utils";
import {axiosInstance} from "./helpers/connectionInstances";

export const navigationRef = React.createRef();
const MainStack = createStackNavigator();

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalState: {}
        }
    }

    updateGlobalState = (user, token, callback = null) => {
        this.setState({
            globalState: {
                user: user,
                token: token
            }
        }, () => callback !== null ? callback() : null)

    }


    componentDidMount() {

        getFromMemory("token").then((memToken) => {
            let token;
            if (memToken != null) token = memToken
            else if (this.state.globalState.token != null) token = this.state.globalState.token

            if (token != null) {
                axiosInstance
                    .get("/user/getCurrent", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    })
                    .then((response) => {
                        console.log(`Tried checking current user ${JSON.stringify(response.data)}`)
                        if (response.data.user.username != null) {
                            // if this is a valid token, store the user object and the token into the global state
                            // for future use
                            // move to the user navigation
                            this.updateGlobalState(response.data.user, token, () => {
                                    navigationRef.current?.navigate("ChatsAndMessagesWrapper");
                                }
                            )
                        }
                    })
                    .catch((error) => {
                        console.log(`Error in App.js ${error}`)
                        console.log(error);
                    });
            }

        });
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{globalState: this.state.globalState, updateGlobalState: this.updateGlobalState}}
            >
                <NavigationContainer ref={navigationRef}>
                    <StatusBar hidden={true}/>
                    <MainStack.Navigator screenOptions={{headerShown: false}}>
                        <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                        <MainStack.Screen name="ChatsAndMessagesWrapper" component={TabNavWrapper}/>
                    </MainStack.Navigator>
                </NavigationContainer>
            </GlobalContext.Provider>
        );
    }
}