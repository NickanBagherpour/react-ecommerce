import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {useDispatch} from "react-redux";

import {fetchCollectionsStart /* ,updateCollections*/} from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../../pages/collection/collection.container";

const ShopPage = ({match}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart())
    }, [dispatch]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
        </div>
    );
}

export default ShopPage;