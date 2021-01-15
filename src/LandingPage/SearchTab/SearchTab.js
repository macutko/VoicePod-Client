import React from "react";
import {Avatar, Divider, List, Searchbar} from "react-native-paper";
import {StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import BusinessProfile from "./BusinessProfile";

export const navigationRef = React.createRef();
const SearchStack = createStackNavigator();

const SearchTab = (inheritance) => {
    return (
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen name="SearchPage">
                {props => <Search {...props} {...inheritance}/>}
            </SearchStack.Screen>
            <SearchStack.Screen name="BusinessProfile">
                {props => <BusinessProfile {...props} {...inheritance}/>}
            </SearchStack.Screen>
        </SearchStack.Navigator>)
}


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            results: []
        }
    }

    onChangeSearch = (e) => {
        this.setState({
            searchQuery: e
        }, () => {
            this.props.socket.emit('search', {searchQuery: this.state.searchQuery}, (error, response) => {
                if (error) console.log(`Error in Search ${error}`)
                if (response) this.setState({results: response},
                    () => console.log(`Length of response object ${response.length}`))
            })
        })
    }

    render() {
        return (
            <>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                />
                <List.Section>
                    {this.state.results.map((object, i) => {
                        return (<>
                                <List.Item titleStyle={styles.profileTitle}
                                           style={styles.container}
                                           descriptionStyle={styles.profileDesc}
                                           onPress={() => this.props.navigation.navigate('BusinessProfile', {props: object})}
                                           title={object.firstName + ' ' + object.lastName}
                                           description={object.description}
                                           descriptionNumberOfLines={2}
                                           key={i}
                                           left={props => <List.Icon {...props}
                                                                     style={styles.profilePic}
                                                                     key={`icon_${i}`}
                                                                     icon={props => <Avatar.Image key={`avatar_${i}`}
                                                                                                  source={{
                                                                                                      uri: `data:image/${object.pictureType};base64,
                                                                                                  ${object.profilePicture}`
                                                                                                  }}/>}/>}
                                />
                                <Divider key={`divider_${i}`}/>
                            </>
                        );
                    })}


                </List.Section>
            </>
        );
    }
}

export default SearchTab;

const styles = StyleSheet.create({
    container: {},
    profileTitle: {
        paddingLeft: 10,
        fontWeight: "bold",

    },
    profileDesc: {
        paddingLeft: 10,
    },
    profilePic: {
        paddingLeft: 5,
        alignItems: "center",
        justifyContent: "center",

    }

});
