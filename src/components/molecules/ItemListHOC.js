import React, {useEffect, useRef, useState} from "react";
import {FlatList, RefreshControl} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import {colorScheme} from "../../constants/Colors";

export const ItemListHOC = ({api, apiProps, listItem, listItemProps, style}) => {

    const [isFetching, setIsFetching] = useState(true);
    const [fetchedData, setFetchedData] = useState([]);
    const _isMounted = useRef(true);
    const ListItem = listItem;

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        if (isFetching) {

            api(apiProps).then(r => {
                if (_isMounted) {
                    setFetchedData(r)
                    setIsFetching(false)
                }
            }).catch(e => _isMounted ? setIsFetching(false) : null)
        }
    }, [isFetching]);


    return (
        <>

            {!isFetching ?
                <FlatList
                    data={fetchedData}
                    style={style}
                    refreshControl={<RefreshControl
                        // colors={["#9Bd35A", "#689F38"]}
                        refreshing={isFetching}
                        onRefresh={() => setIsFetching(true)}/>}
                    renderItem={({item}) => <ListItem {...listItemProps} data={item}/>}
                    keyExtractor={item => item.id}
                /> : <ActivityIndicator animating={true} color={colorScheme.accent}/>}

        </>
    );

}
export default ItemListHOC
