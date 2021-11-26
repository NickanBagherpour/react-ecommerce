import React from 'react';
import {connect} from 'react-redux';

import {clearItem, addItem, removeItem} from '../../redux/cart/cart.actions'


import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
} from './checkout-item.styles';


const CheckoutItem = ({cartItem, clearMe, addMe, removeMe}) => {

    const {name, imageUrl, price, quantity} = cartItem;

    const handleClearItemClick = () => {
        clearMe(cartItem);
    };
    const handleRemoveItemClick = () => {
        removeMe(cartItem);
    };
    const handleAddItemClick = () => {
        addMe(cartItem);
    };

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt='item'/>
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div onClick={handleRemoveItemClick}>&#10094;</div>
                <span>{quantity}</span>
                <div onClick={handleAddItemClick}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoveButtonContainer onClick={handleClearItemClick}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        clearMe: item => dispatch(clearItem(item)),
        addMe: item => dispatch(addItem(item)),
        removeMe: item => dispatch(removeItem(item)),
    };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);