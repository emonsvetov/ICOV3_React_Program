import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({ onChange, selectedDate, minDate }) => {
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if(startDate === null && selectedDate){
      setStartDate(selectedDate);
    }
  }, []);

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
        minDate={minDate}
      />
    </div>
  );
};

DatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};


export default DatePickerField;
