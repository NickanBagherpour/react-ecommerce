import React, {useEffect, lazy, Suspense} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {selectCurrentUser} from "./redux/user/user.selectors";
import {checkUserSession} from "./redux/user/user.actions";

import Header from "./components/header/header.component.jsx";
import Spinner from "./components/spinner/spinner.component.jsx";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import {GlobalStyle} from "./global.styles";

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const AuthPage = lazy(() => import('./pages/auth/auth.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

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
                <ErrorBoundary>
                    <Suspense fallback={<Spinner/>}>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/shop" component={ShopPage}/>
                        <Route exact path='/checkout' component={CheckoutPage}/>
                        <Route exact path="/auth"
                               render={() => currentUser ? <Redirect to="/"/> : <AuthPage/>}
                        />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
