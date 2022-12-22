import React from "react";

const IMG_Exclamation_Point = `${process.env.PUBLIC_URL}/original/img/exclamation-octagon.png`;

export const ErrorMessage = ({ msg }) => {
  return (
    <div className="form-error-message" role="alert">
      <img src={IMG_Exclamation_Point} alt={"Exclamation Point"} />
      <span className="error-navigation-message">{msg}</span>
      <div className="form-error-arrow"></div>
    </div>
  );
};
