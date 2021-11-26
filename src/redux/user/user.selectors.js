import {createSelector} from "reselect";

/* eq. root-reducer {
    user: userReducer,
    ...
}*/

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser,
);