import React from "react";

export const PDF = ({ props }) => {
  const { img, link, title, contStyle, hrefStyle, iconStyle } = props;
  return (
    <div className="d-flex flex-column text-center" style={contStyle} >
      <a href={link} target="_blank" style={hrefStyle} rel="noreferrer">
        <img src={img} alt={title}  style={iconStyle} />
      </a>
      <a className="mt-3" href={link} target="_blank" rel="noreferrer">
        <span>{title}</span>
      </a>
    </div>
  );
};
