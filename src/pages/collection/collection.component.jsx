import React from 'react';
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import {selectCollection} from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";

import {CollectionPageContainer, CollectionTitle, CollectionItemsContainer} from "./collection.styles";

const CollectionPage = () => {

    const {collectionId} = useParams();
    const collection = useSelector(selectCollection(collectionId));

    if (!collection) return (<h1>Error</h1>);

    const {title, items} = collection;
    return (

        <CollectionPageContainer>
            <CollectionTitle>{title}</CollectionTitle>
            <CollectionItemsContainer>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item}/>
                ))}
            </CollectionItemsContainer>
        </CollectionPageContainer>
    );
};

export default CollectionPage;