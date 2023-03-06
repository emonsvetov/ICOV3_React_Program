import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isTrue } from '@lemoncode/fonk-is-true-validator';
isTrue.setErrorMessage("This field is required");

Validators.required.setErrorMessage("This field is required");
const validationSchema = {
    field: {
        goal_plan_id: [Validators.required.validator],
       //user_id: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;