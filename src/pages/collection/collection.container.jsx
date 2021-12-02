import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";
import {selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";

const mapStateToProp = createStructuredSelector(
    {
        isLoading: state => !selectIsCollectionsLoaded(state),
    }
);

const CollectionPageContainer = compose(
    connect(mapStateToProp),
    WithSpinner,
)(CollectionPage);

//todo refactor this pattern with hook ... !!!
export default CollectionPageContainer;