import { Input, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import formValidation from "@/validation/addTeam"

const TeamForm = ({
    onSubmit, 
    loading, 
    btnLabel = 'Save',
    mate = {}
}) => {
    
    return(
        <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            initialValues={ mate }
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                    <Col md="12">
                        <Field name="first_name">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Label>Photo:(300 * 300px)</Label>
                                <Input
                                placeholder="Photo"
                                type="file"
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
                        <Field name="name">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                placeholder="Name"
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
                        <Field name="title">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                placeholder="Title"
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
                        <Field name="description">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                placeholder="Description"
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
                <Row>
                    <Col md="12">
                        <Field name="phone">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Label>Contact Phone</Label>
                                <Input
                                placeholder="Phone Number"
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
                                <Label>Contact Email</Label>
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
                
                <div className='d-flex justify-content-end'>
                <Button disabled={loading} color='danger' type='submit'>{btnLabel}</Button>
                </div>
            </form>
            )}
        </Form>
    )
}

export default TeamForm;