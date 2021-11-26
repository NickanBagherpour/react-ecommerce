import React from "react";
import {connect} from "react-redux";

import {addItem} from "../../redux/cart/cart.actions";

import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer
} from './collection-item.styles';

const CollectionItem = ({item, addMe}) => {
    const {name, price, imageUrl} = item;

    const handleAddToCartClick = event => {
        addMe(item);
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

const mapDispatchToProps = (dispatch) => ({
    addMe: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
