import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isTrue } from '@lemoncode/fonk-is-true-validator';
import {isObject} from "@/shared/helpers";
isTrue.setErrorMessage("This field is required");

Validators.required.setErrorMessage("This field is required");

export const overrideCashValueValidator = args => {
  const { value, values } = args;

  console.log(args);

  if( values.event_type_id == 5 || (isObject(values.event_type_id) && values.event_type_id.value == 5)){
      return {
          succeeded: true,
          type: 'override_cash_value_validator',
          message: ''
      }
  }else{
      return Validators.required.validator(args);
  }
}

export const awardingPointsRequiredValidator = args => {
  const { value, values } = args;
  if( values.event_type_id == 5 || (isObject(values.event_type_id) && values.event_type_id.value == 5)){
      return {
          succeeded: true,
          type: 'awarding_points_required_validator',
          message: ''
      }
  }else{
      return Validators.required.validator(args);
  }
}

export const awardingPointsNumberValidator = args => {
  const { value, values } = args;
  if( values.event_type_id == 5 || (isObject(values.event_type_id) && values.event_type_id.value == 5)){
      return {
          succeeded: true,
          type: 'awarding_points_number_validator',
          message: ''
      }
  }else{
      return isNumber.validator(args);
  }
}

const validationSchema = {
    field: {
        event_id: [Validators.required.validator],
        override_cash_value: [overrideCashValueValidator],
        awarding_points: [awardingPointsRequiredValidator, awardingPointsNumberValidator],
        message: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;
