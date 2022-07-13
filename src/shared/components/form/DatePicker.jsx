import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const handleChange = (date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <div className="date-picker">
      <DatePicker
        // className="form__form-group-datepicker"
        selected={startDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        dropDownMode="select"
      />
    </div>
  );
};

DatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
};


export default DatePickerField;
