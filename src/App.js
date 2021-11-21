import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {auth, createUserProfileDocument, onSnap} from "./firebase/firebase.utils";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {setCurrentUser} from "./redux/user/user.actions";
import Header from "./components/header/header.component.jsx";
import AuthPage from "./pages/auth/auth.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

import "./App.css";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                const unsub = onSnap(userRef, (doc) => {
                    setCurrentUser({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
            }
            setCurrentUser(userAuth); //userAuth is null here , it means set currentUser to null , sign out
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage}/>

                    <Route
                        exact
                        path="/auth"
                        render={() =>
                            this.props.currentUser ? <Redirect to="/"/> : <AuthPage/>
                        }
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

/*
or
const mapStateToProps = ({user: {currentUser}}) => ({
  currentUser : currentUser
});
or
const mapStateToProps = state => ({
  currentUser : state.user.currentUser
});
*/

export default connect(mapStateToProps, mapDispatchToProps)(App);
