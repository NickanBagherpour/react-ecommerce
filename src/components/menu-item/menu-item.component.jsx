import React from "react";
import { withRouter } from "react-router";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  const handleMenuItemClick = () => {
    history.push(`${match.url}${linkUrl}`);
  };

  return (
    //history & match are related to withRouter HOC [Higher Order Component]
    <div className={`${size} menu-item`} onClick={handleMenuItemClick}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);
