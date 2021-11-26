import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import {updateCollections} from "../../redux/shop/shop.actions";
import {convertCollectionsSnapshotToMap, getCollection, onSnap} from "../../firebase/firebase.utils";
import CollectionsOverView from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverView);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {

    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {doUpdateCollections} = this.props;
        const collectionRef = getCollection('collections');
        // console.log(collectionRef);

        /*const unsub =*/
        onSnap(collectionRef, (collections) => {
            const collectionsMap = convertCollectionsSnapshotToMap(collections);
            // console.log(collectionsMap);
            doUpdateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}
                       render={props => (
                           <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                       )}
                />
                <Route path={`${match.path}/:collectionId`}
                       render={props => (
                           <CollectionPageWithSpinner isLoading={loading} {...props} />
                       )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    doUpdateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);