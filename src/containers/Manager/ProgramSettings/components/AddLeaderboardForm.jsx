import React, {useEffect, useState} from 'react';
import { Input, Col, Row, FormGroup, Label, Button, Card, CardHeader, CardBody} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import formValidation from "@/validation/addEvent"

const options = [
    {'value': 0, 'label':'Total Points Awarded'},
    {'value': 1, 'label':'# of Awards Received'},
    {'value': 2, 'label':'Goal Progress'},
]

const TypeOptions = () =>(
    options.map((item, index) =>{
        return <option key={index} value={item.value}>{item.label}</option>
    })
)

const AddLeaderboardForm = ({
    onSubmit, 
    onChangeAwardValue, 
    loading,
    handleChange,
    btnLabel = 'Save Leaderboard',
    organization,
    program,
    leaderboard
    }) => {
    
    let props = {
        organization,
        program,
        }
    return(
        <Form
            onSubmit={onSubmit}
            validate={(values) => formValidation.validateForm(values)}
            mutators={{
                onChangeAwardValue
            }}
            initialValues={leaderboard}
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                    <Col md="6">
                        <Label>Leaderboard Name</Label>
                    </Col>
                    <Col md="6">
                        <Field name="name">
                        {({ input, meta }) => (
                            <FormGroup>
                                <Input
                                placeholder="Leaderboard Name"
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
                        <Label>Leaderboard Type</Label>
                    </Col>
                    <Col md="6">
                        <Field name="type">
                            {({ input, meta }) => (
                                <FormGroup>
                                <Input type="select" 
                                    defaultValue={values?.type} 
                                    onChange={(e) =>handleChange(e.target.value, 'type')}>
                                <TypeOptions />
                                </Input>
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

export default AddLeaderboardForm;