import React from "react";
import {useRouteMatch, useHistory} from "react-router-dom";

import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle
} from './menu-item.styles';

const MenuItem = ({title, imageUrl, size, linkUrl}) => {

    const history = useHistory();
    const match = useRouteMatch();

    const handleMenuItemClick = () => {
        history.push(`${match.url}${linkUrl}`);
    };

    return (
        <MenuItemContainer size={size} onClick={handleMenuItemClick}>
            <BackgroundImageContainer
                className='background-image'
                imageUrl={imageUrl}
            />
            <ContentContainer className='content'>
                <ContentTitle>{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ContentContainer>
        </MenuItemContainer>
    );
};

export default MenuItem;
