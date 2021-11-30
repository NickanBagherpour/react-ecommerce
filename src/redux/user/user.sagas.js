import {takeLatest, all, call, put} from 'redux-saga/effects';

import UserActionTypes from "./user.types";
import {
    signInWithGoogle as signWithGoogle,
    createUserProfileDocument,
    getUserByRef, customSignInWithEmailAndPassword
} from "../../firebase/firebase.utils";
import {emailSignInFailure, emailSignInSuccess, googleSignInFailure, googleSignInSuccess} from "./user.actions";

export function* signInWithGoogle() {
    try {
        const credential = yield signWithGoogle();
        // console.log(credential);
        const {user} = credential;
        // console.log(user);
        const userRef = yield call(createUserProfileDocument, user);
        // console.log(userRef);
        const userSnapshot = yield call(getUserByRef, userRef);
        yield put(
            googleSignInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );

    } catch (error) {
        yield put(googleSignInFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {

        const user = yield customSignInWithEmailAndPassword(email, password);

        const userRef = yield call(createUserProfileDocument, user);

        const userSnapshot = yield call(getUserByRef, userRef);

        yield put(
            emailSignInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data(),
            })
        );
    } catch (error) {
        yield put(emailSignInFailure(error));
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