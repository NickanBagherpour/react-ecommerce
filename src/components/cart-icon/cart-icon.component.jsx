import React from "react";
import {useSelector, useDispatch} from "react-redux";

import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import {CartIconContainer, ItemCountContainer, ShoppingIcon,} from "./cart-icon.styles";

const CartIcon = () => {

    const itemCount = useSelector(selectCartItemsCount);
    const dispatch = useDispatch();

    const handleToggleCartClick = () => {
        dispatch(toggleCartHidden());
    }

    return (
        <CartIconContainer onClick={handleToggleCartClick}>
            <ShoppingIcon/>
            <ItemCountContainer>{itemCount}</ItemCountContainer>
        </CartIconContainer>
    );
};

export default CartIcon;
