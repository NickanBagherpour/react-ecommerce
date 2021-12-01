import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {signOutStart} from '../../redux/user/user.actions'

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {ReactComponent as Logo} from '../../assets/logo.svg';

import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer,} from './header.styles';

const Header = () => {

    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    const dispatch = useDispatch();

    const handleSignOutClick = () => {
        dispatch(signOutStart())
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

export default Header;
