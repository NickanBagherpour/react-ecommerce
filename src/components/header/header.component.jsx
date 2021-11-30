import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {signOutStart} from '../../redux/user/user.actions'

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {ReactComponent as Logo} from '../../assets/logo.svg';

import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer,} from './header.styles';

const Header = ({currentUser, hidden, doSignOutStart}) => {
    const handleSignOutClick = () => {
        doSignOutStart();
    };

    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/shop">
                    CONTACT
                </OptionLink>
                {currentUser ? (
                    <OptionLink as='div' onClick={handleSignOutClick}>
                        SIGN OUT
                    </OptionLink>
                ) : (
                    <OptionLink to="/auth">
                        SIGN IN
                    </OptionLink>
                )}

                <CartIcon/>
            </OptionsContainer>

            {hidden ? null : <CartDropdown/>}

        </HeaderContainer>
    );
};


const mapDispatchToProps = dispatch => ({
    doSignOutStart: () => dispatch(signOutStart()),
});


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
