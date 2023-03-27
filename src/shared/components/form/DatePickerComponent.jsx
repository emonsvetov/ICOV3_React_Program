
import DatePicker from "react-datepicker";
import {parse, format, isValid, toDate } from "date-fns";
//import { isMobileOnly } from 'react-device-detect';

const FieldDatePicker = ({ name, input, input: { value, onChange } }) => {
  let isValidDate = false;
  let selected = null

  if( value )
  {
    isValidDate = isValid(value);
    selected = isValidDate ? value : null
  }
  return (
    <DatePicker
      //withPortal={isMobileOnly}
      placeholderText={value ? format(new Date(value), "yyyy-MM-dd") : "Select date"}
      dateFormat="P"
      selected={selected} // needs to be checked if it is valid date
      disabledKeyboardNavigation
      name={name}
      onChange={(date) => {
        if (isValid(date)) {
          input.onChange(format(new Date(date), "yyyy-MM-dd"));
        } else {
          input.onChange(null);
        }
      }}
    />
  );
};

export default FieldDatePicker