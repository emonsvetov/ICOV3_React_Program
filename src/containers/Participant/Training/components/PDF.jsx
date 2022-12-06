import React from "react";

export const PDF = ({ props }) => {
  const { img, link, title } = props;
  return (
    <div className="d-flex flex-column text-center">
      <a href={link} target="_blank" rel="noreferrer">
        <img src={img} alt={title} />
      </a>
      <a className="mt-3" href={link} target="_blank" rel="noreferrer">
        <span>{title}</span>
      </a>
    </div>
  );
};
