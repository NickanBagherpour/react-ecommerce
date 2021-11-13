import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './components/header/header.component.jsx';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
       <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
