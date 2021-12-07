import React from 'react';

import {
    CartItemContainer,
    ItemDetailsContainer,
    CartItemImage,
    CartItemDetailName
} from './cart-item.styles';

const CartItem = ({item: {imageUrl, price, name, quantity}}) => (
    <CartItemContainer>
        <CartItemImage src={imageUrl} alt='item'/>
        <ItemDetailsContainer>
            <CartItemDetailName>{name}</CartItemDetailName>
            <span>
                {quantity} x ${price}
            </span>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export default React.memo(CartItem);
