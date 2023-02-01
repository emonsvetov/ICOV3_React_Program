import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { createMarkup } from "@/shared/helper";

const TemplateButton = ({
  template,
  className,
  onClick,
  text,
  type,
  disabled,
  link,
  color,
  spinner
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
        color={color?color:null}
        className={className}
        onClick={onClick}
        style={template.button_color ? {
          borderRadius,
          color: template.button_color,
          backgroundColor: template.button_bg_color,
        } : {}}
        type={type ? type : "submit"}
        disabled={disabled}
      >
        {spinner && <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />}
        <div dangerouslySetInnerHTML={createMarkup(text)}/>
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
