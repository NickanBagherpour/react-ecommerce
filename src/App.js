import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {selectCurrentUser} from "./redux/user/user.selectors";
import {checkUserSession} from "./redux/user/user.actions";

import Header from "./components/header/header.component.jsx";
import AuthPage from "./pages/auth/auth.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import "./App.css";

class App extends React.Component {

    componentDidMount() {
        this.props.doCheckUserSession()
    }

    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>

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

const mapDispatchToProps = dispatch => ({
    doCheckUserSession : () => dispatch(checkUserSession()),
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    // collectionsArray: selectCollectionsForPreview
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

export default connect(mapStateToProps,mapDispatchToProps)(App);
