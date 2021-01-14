import React from "react";
import {Searchbar} from "react-native-paper";

export default class SearchTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        }
    }

    onChangeSearch = (e) => {
        this.setState({
            searchQuery: e
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
            </>
        );
    }
}