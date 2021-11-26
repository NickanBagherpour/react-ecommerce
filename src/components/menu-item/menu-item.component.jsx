import React from "react";
import { withRouter } from "react-router";

import {
    MenuItemContainer,
    BackgroundImageContainer,
    ContentContainer,
    ContentTitle,
    ContentSubtitle
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  const handleMenuItemClick = () => {
    history.push(`${match.url}${linkUrl}`);
  };

  return (
    //history & match are related to withRouter HOC [Higher Order Component]
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

export default withRouter(MenuItem);
