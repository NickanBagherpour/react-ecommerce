import React, {useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {selectCurrentUser} from "./redux/user/user.selectors";
import {checkUserSession} from "./redux/user/user.actions";

import Header from "./components/header/header.component.jsx";
import AuthPage from "./pages/auth/auth.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import {GlobalStyle} from "./global.styles";

const App = () => {

    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]); //cause doCheckUserSession is in props

    return (
        <BrowserRouter>
            <GlobalStyle/>
            <Header/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/shop" component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>

                <Route exact path="/auth"
                       render={() => currentUser ? <Redirect to="/"/> : <AuthPage/>}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
