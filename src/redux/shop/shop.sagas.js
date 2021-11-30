import {takeLatest, call, put, all} from 'redux-saga/effects';

import ShopActionTypes from './shop.types';
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";
import {convertCollectionsSnapshotToMap, getCollection, getDocsFromCollection} from "../../firebase/firebase.utils";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = getCollection('collections');
        const snapshot = yield getDocsFromCollection(collectionRef);
        // const collectionsMap = yield convertCollectionsSnapshotToMap(snapshot); or
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart),
    ]);
}