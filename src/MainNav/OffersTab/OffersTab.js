import React from "react";
import {FlatList, RefreshControl} from "react-native";
import OfferListItem from "./OfferList.item";


export default class OffersTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            isFetching: false,
        }
    }

    onRefresh() {
        this.setState({isFetching: true}, () => {
            this.getOffers();
        });
    }

    getOffers = () => {
        this.props.socket.emit('getOffers', {}, (error, response) => {
            if (error === null) {
                console.log(`Amount of offers: ${response.length}`)
                this.setState({offers: response, isFetching: false})
            } else {
                console.log(`Error in Offers Tab ${error}`)
            }
        })
    }

    componentDidMount() {
        this.getOffers()
    }

    render() {
        return (
            <>
                <FlatList
                    data={this.state.offers}
                    refreshControl={<RefreshControl
                        // colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.isFetching}
                        onRefresh={() => this.onRefresh()}/>}
                    renderItem={({item}) => <OfferListItem {...this.props} data={item} />}
                    keyExtractor={item => item.id}
                />

            </>
        );
    }
}