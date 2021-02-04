import React from "react";
import { StyleSheet } from "react-native";
import OutlineTopScreen from "../../components/molecules/OutlineTopScreen";
import SearchboxCustom from "../../components/molecules/SearchboxCustom";
import UserCard from "../../components/organisms/UserCard";

class SearchTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            results: [],
        };
    }

    onChangeSearch = (e) => {
        this.setState(
            {
                searchQuery: e,
            },
            () => {
                this.props.socket.emit(
                    "search",
                    { searchQuery: this.state.searchQuery },
                    (error, response) => {
                        if (error) console.log(`Error in Search ${error}`);
                        if (response)
                            this.setState({ results: response }, () =>
                                console.log(
                                    `Length of response object ${response.length}`
                                )
                            );
                    }
                );
            }
        );
    };

    render() {
        return (
            <OutlineTopScreen title={"Search"}>
                <SearchboxCustom
                    onChangeText={this.onChangeSearch}
                    value={this.state.searchQuery}
                    placeholder={"Search by name"}
                />
                {this.state.results.map((result, i) => (
                    <UserCard
                        user={result}
                        number={i}
                        onPress={() => {
                            this.props.navigation.push("UserProfile", {
                                ...result,
                            });
                        }}
                    />
                ))}
            </OutlineTopScreen>
        );
    }
}

export default SearchTab;

const styles = StyleSheet.create({
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
    },
});
