import React, {useEffect, useState} from 'react';
import { Input, Col, Row, FormGroup, Label, Button} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import axios from 'axios'
import {labelizeNamedData} from '@/shared/helper'
import {useDispatch, sendFlashMessage} from "@/shared/components/flash"
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage"
import {getLeaderboardTypes} from '@/services/program/getLeaderboardTypes'
import renderSelectField from '@/shared/components/form/Select'
import TemplateButton from "@/shared/components/TemplateButton"

const AddLeaderboardForm = ({
    organization,
    program
    }) => {
    const dispatch = useDispatch()

    const [leaderboardTypes, setLeaderboardTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    const onSubmit = (values) => {
        let formData = {};

        formData["leaderboard_type_id"] = values.leaderboard_type_id.value;
        formData["name"] = values.name;
    
        console.log(formData)
        // return;

        setLoading(true)
        axios
          .post(`/organization/${organization.id}/program/${program.id}/leaderboard`, formData)
          .then((res) => {
            //   console.log(res)
            if (res.status == 200) {
                // alert(window.location.href);
                window.location.reload()
                dispatch(sendFlashMessage('Leaderboard added successfully!', 'alert-success', 'top'))
                setLoading(false)
            }
          })
          .catch((err) => {
            //console.log(error.response.data);
            dispatch(sendFlashMessage(<ApiErrorMessage errors={err.response.data} />, 'alert-danger', 'top'))
            setLoading(false)
          });
    };

    useEffect(() => {
        if( organization && program )   {
            let mounted = true;
            setLoading(true)
            getLeaderboardTypes(organization.id, program.id)
                .then(items => {
                if(mounted) {
                    setLeaderboardTypes(labelizeNamedData(items))
                    setLoading(false)
                }
                })
            return () => mounted = false;
        }
    }, [organization, program])  
    
    let props = {
        organization,
        program,
        }
    return(
        <Form
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ handleSubmit, form, submitting, pristine, values }) => (
            <form className="form d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>
                <Row>
                    <Col md="4">
                        <Label>Leaderboard Name</Label>
                    </Col>
                    <Col md="8">
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
                    <Col md="4">
                        <Label>Select leaderboard type</Label>
                    </Col>
                    <Col md="8">
                        <Field 
                                name="leaderboard_type_id"
                                className="react-select"
                                options={leaderboardTypes}
                                placeholder={'Select Event Type'}
                                component={renderSelectField}
                                // parse={value => {
                                //     return value;
                                // }}
                        />
                    </Col>
                </Row>                                        
                <div className='d-flex justify-content-end'>
                    <TemplateButton disabled={loading} type='submit' text='Save' />
                </div>
            </form>
            )}
        </Form>
    )
}

const validate = values => {
    let errors = {}
    if( !values.name )   {
        errors.name = 'Please enter leaderboard name'
    }
    if( !values.leaderboard_type_id )   {
        errors.leaderboard_type_id = 'Please select leaderboard type'
    }
    return errors
}

export default AddLeaderboardForm;