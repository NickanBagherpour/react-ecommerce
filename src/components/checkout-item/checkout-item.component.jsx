import React from 'react';
import {connect} from 'react-redux';

import {clearItem, addItem, removeItem} from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss';

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
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item'/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={handleRemoveItemClick}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={handleAddItemClick}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={handleClearItemClick}>&#10005;</div>
        </div>
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