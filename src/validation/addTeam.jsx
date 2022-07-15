import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
import { isTrue } from '@lemoncode/fonk-is-true-validator';
isTrue.setErrorMessage("This field is required");
Validators.required.setErrorMessage("This field is required");
const validationSchema = {
    field: {
        name: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;