import React from "react";
import {useDispatch} from "react-redux";

import {addItem} from "../../redux/cart/cart.actions";

import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer
} from './collection-item.styles';

const CollectionItem = ({item}) => {

    const dispatch = useDispatch();

    const {name, price, imageUrl} = item;

    const handleAddToCartClick = event => {
        dispatch(addItem(item));
    };

    return (
        <CollectionItemContainer>
            <BackgroundImage className='image' imageUrl={imageUrl}/>
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={handleAddToCartClick} inverted>
                Add to cart
            </AddButton>
        </CollectionItemContainer>
    );

};

export default CollectionItem;
