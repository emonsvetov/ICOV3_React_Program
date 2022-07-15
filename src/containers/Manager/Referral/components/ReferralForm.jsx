import { Input, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import renderToggleButtonField from "@/shared/components/form/ToggleButton"
import formValidation from "@/validation/account"

const ReferralForm = ({
    onSubmit, 
    loading, 
    btnLabel = 'Save',
    referral = {}
}) => {
    
    return(
        <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            initialValues={referral}
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                    <Col md="12">
                        <Field name="first_name">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="First Name"
                                type="text"
                                {...input}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                    {meta.error}
                                </span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Field name="last_name">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="Last Name"
                                type="text"
                                {...input}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                    {meta.error}
                                </span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                </Row>

                <Row>
                    <Col md="12">
                        <Field name="email">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="Email"
                                type="text"
                                {...input}
                                />
                                {meta.touched && meta.error && <span className="text-danger">
                                    {meta.error}
                                </span>}
                            </FormGroup>
                        )}
                        </Field>
                    </Col>
                </Row>
                
                <Row>
                <Col md="12">
                    <FormGroup className='d-flex justify-content-between'>
                    <Label>Status</Label>
                    <Field
                        name="status"
                        component={renderToggleButtonField}
                    />
                    </FormGroup>
                </Col>
                </Row>
                
                <div className='d-flex justify-content-end'>
                <Button disabled={loading} color='danger' type='submit'>{btnLabel}</Button>
                </div>
            </form>
            )}
        </Form>
    )
}

export default ReferralForm;