import ShopActionTypes from './shop.types';
import {
    convertCollectionsSnapshotToMap,
    getCollection,
    getDocsFromCollection
} from "../../firebase/firebase.utils";

export const updateCollections = collectionsMap => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return /*async*/ dispatch => {
        const collectionRef = getCollection('collections');
        dispatch(fetchCollectionsStart());

        /*await*/
        getDocsFromCollection(collectionRef).then(
            snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            }
        ).catch(error => dispatch(fetchCollectionsFailure(error.message)));

    };
};