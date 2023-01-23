import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isTrue } from '@lemoncode/fonk-is-true-validator';
isTrue.setErrorMessage("This field is required");

Validators.required.setErrorMessage("This field is required");
const validationSchema = {
    field: {
        event_id: [Validators.required.validator],
        override_cash_value: [Validators.required.validator],
        awarding_points: [Validators.required.validator, isNumber.validator],
        message: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;