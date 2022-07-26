import { Input, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import renderSelectField from '@/shared/components/form/Select'
import renderToggleButtonField from "@/shared/components/form/ToggleButton"
import formValidation from "@/validation/addEvent"

const EventForm = ({
    onSubmit, 
    onChangeAwardValue, 
    loading,
    eventTypes,
    btnLabel = 'Save',
    event = {},
    program
}) => {
    // console.log(event)
    if( event?.max_awardable_amount)    {
        event.awarding_points = program.factor_valuation * event.max_awardable_amount
    }
    return(
        <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            mutators={{
            onChangeAwardValue
            }}
            initialValues={event
            }
        >
            {({ handleSubmit, form, submitting, pristine, values }) => {
            return (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                <Col md="12">
                    <Field name="name">
                    {({ input, meta }) => (
                        <FormGroup>
                            <Input
                            placeholder="Event Name"
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
                <Col md="6">
                    <Field name="max_awardable_amount">
                    {({ input, meta }) => (
                        <FormGroup>
                            <Input
                            placeholder="Max Awardable Amount"
                            type="text"
                            onKeyUp={form.mutators.onChangeAwardValue}
                            {...input}
                            />
                                {meta.touched && meta.error && <span className="text- ">
                                {meta.error}
                                </span>}
                        </FormGroup>
                    )}
                    </Field>
                </Col>
                <Col md="6">
                    <Field name="awarding_points">
                        {({ input, meta }) => (
                            <FormGroup>
                            <Input
                                placeholder="Awarding Points"
                                onKeyUp={form.mutators.onChangeAwardValue}
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
                
                {/* <Col md="6">
                    <Field name="ledger_code">
                    {({ input, meta }) => (
                        <FormGroup>
                            <Input
                            placeholder="Ledger Code"
                            type="text"
                            {...input}
                            />
                                {meta.touched && meta.error && 
                                <span className="text-danger">
                                {meta.error}
                                </span>
                                }
                        </FormGroup>
                    )}
                    </Field>
                </Col> */}
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup className='d-flex justify-content-between'>
                    <Label>Enable This Event</Label>
                    <Field
                        name="enable"
                        component={renderToggleButtonField}
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="9">
                    <Field 
                            name="event_type_id"
                            className="react-select"
                            options={eventTypes}
                            placeholder={'Select Event Type'}
                            component={renderSelectField}
                    />
                </Col>
                {/* <Col md="6">
                    <Field 
                        name="email_template_id"
                        className="react-select"
                        options={[]}
                        placeholder={'Select a Template'}
                        component={renderSelectField}
                    />
                </Col> */}
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup className='d-flex justify-content-between'>
                        <Label>Post to Social Wall</Label>
                        <Field
                        name="post_to_social_wall"
                        component={renderToggleButtonField}
                        />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup className='d-flex justify-content-between'>
                    <Label>Award Message Editable</Label>
                    <Field
                        name="award_message_editable"
                        component={renderToggleButtonField}
                    />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col md="12">
                    <Field name="message">
                    {({ input, meta }) => (
                        <FormGroup>
                            <Input
                            placeholder="Award Message"
                            type="textarea"
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
                <div className='d-flex justify-content-end'>
                <Button disabled={loading} color='danger' type='submit'>{btnLabel}</Button>
                </div>
            </form>
            )}
        }
        </Form>
    )
}

export default EventForm;