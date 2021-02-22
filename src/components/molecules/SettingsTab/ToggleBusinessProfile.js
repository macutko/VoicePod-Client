import React, {useContext, useEffect, useRef} from "react";
import GlobalContext from "../../atoms/GlobalState";
import {List, Switch} from 'react-native-paper'

const ToggleBusinessProfile = ({submitUpdate}) => {
    const context = useContext(GlobalContext)
    const _isMounted = useRef(true)
    console.log(Object.keys(context))

    useEffect(() => {

        return () => {
            _isMounted.current = false
        }
    }, []);

    const toggleBusinessAccount = () => {
        //TODO: make this isMounted and isFetching compliable
        //TODO: first add a payment method
        submitUpdate({
            businessActivated: !context.user.businessActivated
        }).then((r) => {
                // refreshState(this.props.globalState.token)
            }
        ).catch(e => console.log(`Error in Payments ${e}`))

    }


    return (
        <List.Item title="Business account" right={() => <Switch value={context.user.businessActivated}
                                                                 onValueChange={toggleBusinessAccount}/>
        }/>
    )
}

export default ToggleBusinessProfile
