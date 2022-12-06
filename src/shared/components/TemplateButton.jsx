import React, { useState } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const TemplateButton = ({
  template,
  className,
  onClick,
  text,
  type,
  disabled,
  link,
  color,
}) => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate(link);
  };
  if (!template) return "";
  className =
    "template-button border-0" + (className !== "" ? " " + className : "");
  onClick = link ? routeChange : onClick;
  const buttonCorner = parseInt(template.button_corner);
  const borderRadius = !isNaN(buttonCorner) ? buttonCorner : 0;

  return (
    <>
      <Button
        color={color}
        className={className}
        onClick={onClick}
        style={{
          borderRadius,
          color: template.button_color,
          backgroundColor: template.button_bg_color,
        }}
        type={type ? type : "submit"}
        disabled={disabled}
      >
        {text}
      </Button>
    </>
  );
};

TemplateButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

TemplateButton.defaultProps = {
  text: "Click me!",
  disabled: false,
  className: "",
  color: "secondary",
  onClick: Object,
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(TemplateButton);
