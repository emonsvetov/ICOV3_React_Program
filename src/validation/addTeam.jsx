import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
Validators.required.setErrorMessage("This field is required");
const validationSchema = {
    field: {
        name: [Validators.required.validator],
        contact_email: [Validators.required.validator],
        contact_phone: [Validators.required.validator],
        title: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;