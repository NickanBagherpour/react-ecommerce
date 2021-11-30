import {takeLatest, all, call, put} from 'redux-saga/effects';

import UserActionTypes from "./user.types";
import {
    signInWithGoogle as signWithGoogle,
    createUserProfileDocument,
    getUserByRef,
    customSignInWithEmailAndPassword
} from "../../firebase/firebase.utils";
import {signInFailure, signInSuccess} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        // console.log(userRef);
        const userSnapshot = yield call(getUserByRef, userRef);
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );

    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const credential = yield signWithGoogle();
        // console.log(credential);
        const {user} = credential;
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const user = yield customSignInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
    ]);
}