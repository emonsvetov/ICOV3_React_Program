import React, {useState} from 'react';
import {Button} from 'reactstrap';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const TemplateButton = ({template, className, onClick, text, type, disabled, link}) => {
  let navigate = useNavigate();
  const routeChange = () => {
    navigate(link);
  }
  if (!template) return ''

  return (
    <>
      <Button className={className + ' ' + 'template-button'} onClick={link ? routeChange : onClick}
              style={{
                borderRadius: parseInt(template.button_corner),
                color: template.button_color,
                backgroundColor: template.button_bg_color,
              }}
              type={type ? type : "submit"}
              disabled={disabled}
      >
        {text}
      </Button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    template: state.template
  };
};

export default connect(mapStateToProps)(TemplateButton);