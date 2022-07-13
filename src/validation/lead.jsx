import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
import { isTrue } from '@lemoncode/fonk-is-true-validator';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
isTrue.setErrorMessage("This field is required");
Validators.required.setErrorMessage("This field is required");
const validationSchema = {
    field: {
        first_name: [Validators.required.validator],
        last_name: [Validators.required.validator],
        email: [Validators.required.validator],
        area_code: [Validators.required.validator, isNumber.validator],
        number: [Validators.required.validator, isNumber.validator],
        content: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;