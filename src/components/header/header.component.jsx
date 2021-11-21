import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {createStructuredSelector} from  'reselect';

import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./header.styles.scss";

const Header = ({ currentUser , hidden }) => {
  const handleSignOutClick = () => {
    auth.signOut();
  };

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={handleSignOutClick}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/auth">
            SIGN IN
          </Link>
        )}

        <CartIcon />
      </div>


      {hidden ? null : <CartDropdown />}


    </div>
  );
};

const mapStateToProps = createStructuredSelector ({
  currentUser:  selectCurrentUser,
  hidden : selectCartHidden,
});

/*
or
const mapStateToProps = state => ({
  currentUser:  state.user.currentUser,
  hidden : state.cart.hidden,
});
or
const mapStateToProps = ({ user : {currentUser} , cart : {hidden} }) => ({
  currentUser,
  hidden ,
});

*/

export default connect(mapStateToProps)(Header);
