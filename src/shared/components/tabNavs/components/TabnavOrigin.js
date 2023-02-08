import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

function TabNavOrigin(props) {
  const { title, icon, isActive } = props;
  const img_icon = `${process.env.PUBLIC_URL}/theme/original/img/tab_navs/${icon}.png`;
  return (
    <div className="cursor-pointer">
      <h3 className="text-center pb-1" style={{ fontSize: "16px" }}>
        {title}
      </h3>
      <div className="d-flex justify-content-center">
        <img
          className=" rounded-1"
          alt={title}
          src={img_icon}
          width={"150px"}
        />
      </div>
    </div>
  );
}

TabNavOrigin.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

TabNavOrigin.defaultProps = {};

export default TabNavOrigin;
