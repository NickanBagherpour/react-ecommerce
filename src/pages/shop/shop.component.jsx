import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import {fetchCollectionsStart /* ,updateCollections*/} from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../../pages/collection/collection.container";

const ShopPage = ({doFetchCollectionsStart, match}) => {

    useEffect(() => {
        doFetchCollectionsStart();
    }, [doFetchCollectionsStart]); //cause doFetchCollectionsStart is in props

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
            <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
        </div>
    );

}

const mapDispatchToProps = dispatch => ({
    // doUpdateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    // doFetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    doFetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);