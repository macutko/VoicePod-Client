import React from "react";
import {FlatList, RefreshControl} from "react-native";
import OfferListItem from "../../components/molecules/OfferList.item";
import {getOffersByUserId} from "../../api/offer/getOffers";


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
        getOffersByUserId(this.props.socket).then(r => {
            if (this._isMounted) {
                this.setState({offers: r, isFetching: false})
            }
        }).catch()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
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
                    renderItem={({item}) => <OfferListItem {...this.props} data={item}/>}
                    keyExtractor={item => item.id}
                />

            </>
        );
    }
}
