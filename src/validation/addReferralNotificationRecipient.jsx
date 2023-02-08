import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { Validators } from '@lemoncode/fonk';
Validators.required.setErrorMessage("This field is required");
const validationSchema = {
    field: {
        referral_notification_recipient_email: [Validators.required.validator],
        referral_notification_recipient_name: [Validators.required.validator],
        referral_notification_recipient_lastname: [Validators.required.validator],
    }
}
const formValidation = createFinalFormValidation(validationSchema);
export default formValidation;