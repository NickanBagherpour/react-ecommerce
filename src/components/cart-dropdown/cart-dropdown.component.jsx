import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {withRouter} from "react-router-dom";

import {selectCartItems} from '../../redux/cart/cart.selectors'
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import CartItem from "../cart-item/cart-item.component";

import {
    CartDropdownContainer,
    CartItemsContainer,
    EmptyMessageContainer,
    CartDropdownButton,
} from "./cart-dropdown.styles";

const CartDropdown = ({cartItems, history, dispatch}) => {
    const handleCheckoutClick = () => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem}/>
                    ))
                ) : (
                    <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
                )}
            </CartItemsContainer>
            <CartDropdownButton onClick={handleCheckoutClick}>GO TO CHECKOUT</CartDropdownButton>
        </CartDropdownContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

/*
or
const mapStateToProps = state => ({
  cartItems: selectCartItems(state),
});
*/

export default withRouter(connect(mapStateToProps)(CartDropdown));
