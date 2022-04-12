import React from 'react';
import PropTypes from 'prop-types';
import { renderComponentField } from '@/shared/components/form/FormField';

export const ToggleButtonField = React.forwardRef(({
  onChange, name, disabled, value,
}, ref) => (
  <>
    <input
      className="react-switch-checkbox"
      type="checkbox"
      name={name}
      onChange={onChange}
      checked={value}
      disabled={disabled}
      ref={ref}
    />
    <label 
    className='react-switch-label' 
    onClick={() => onChange(!value)} 
    style={{ background: value==true && '#FCB040' }}
    htmlFor={name}
     >
      <span className="react-switch-button"></span>
    </label>
  </>
));

ToggleButtonField.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
};

ToggleButtonField.defaultProps = {
  disabled: false,
};

export default renderComponentField(ToggleButtonField);
