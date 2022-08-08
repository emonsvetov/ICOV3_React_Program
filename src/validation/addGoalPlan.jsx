import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isTrue } from '@lemoncode/fonk-is-true-validator';
isTrue.setErrorMessage("This field is required");

Validators.required.setErrorMessage("This field is required");
const validationSchema = {
    field: {
        name: [Validators.required.validator],
        goal_plan_type_id: [Validators.required.validator],
        exceeded_event_id:[Validators.required.validator],
     //   event_type_id: [Validators.required.validator],
       // max_awardable_amount: [Validators.required.validator, isNumber.validator],
        //awarding_points: [isNumber.validator],
       // message: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;