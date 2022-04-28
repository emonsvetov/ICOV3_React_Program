import React, {useEffect, useState} from 'react';
import { Input, Col, Row, FormGroup, Label, Button, Card, CardHeader, CardBody} from 'reactstrap';
import { Form, Field } from 'react-final-form';
import renderToggleButtonField from "@/shared/components/form/ToggleButton"
import { useTable } from 'react-table'
import formValidation from "@/validation/addEvent"
import {
    Table,
  } from 'reactstrap';
  import {getEvents} from '@/services/program/getEvents'

const options = [
    {'value': 0, 'label':'# of Awards Received'},
    {'value': 1, 'label':'# of Awards Received'},
]

const TypeOptions = () =>(
    options.map((item, index) =>{
        return <option key={index} value={item.value}>{item.label}</option>
    })
)
const EVENTS_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Event Type",
        accessor: "type",
    }
]
const handleAssign = (id, type) =>{

}
const RenderActions = ({row, type}) => {
    return (
        <span>
            <Button color="danger" onClick={() => handleAssign(row.original.id, false)}>{type?'Unassign': 'Assign'}</Button> 
        </span>
    )
  }

let final_columns = (assigned) =>[
...EVENTS_COLUMNS, 
...[{
    Header: "Action",
    accessor: "action",
    Footer: "Action",
    Cell: ({ row }) => <RenderActions row={row} type={assigned}/>,
}]
]


const EventTable = ({organization, program, assigned }) =>{
    const columns = React.useMemo( () => final_columns(assigned), [])
    const [events, setEvents] = useState([]);
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data:events})
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        getEvents(organization.id, program.id)
          .then(items => {
            if(mounted) {
              setEvents(items)
              setLoading(false)
            }
          })
        return () => mounted = false;
      }, [])  
    return (
        <Table striped borderless size="md" {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody>
            {rows.map((row, i) => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return (
                    <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </td>
                    )
                })}
                </tr>
            )
            })}
        </tbody>
    </Table>
    )
}

const LeaderboardForm = ({
    onSubmit, 
    onChangeAwardValue, 
    loading,
    handleChange,
    btnLabel = 'Save',
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
                <Card className='w-100'>
                    <CardHeader tag="h5" className='text-center'>Leaderboard Information</CardHeader>
                    <CardBody>
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
                                            disabled
                                            onChange={(e) =>handleChange(e.target.value, 'type')}>
                                        <TypeOptions />
                                        </Input>
                                        </FormGroup>
                                    )}
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Label>Enable This Leaderboard</Label>
                            </Col>
                            <Col md="6">
                                <FormGroup className='d-flex justify-content-between'>
                                <Field
                                    name="enable"
                                    component={renderToggleButtonField}
                                />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Label>Visible</Label>
                            </Col>
                            <Col md="6">
                                <FormGroup className='d-flex justify-content-between'>
                                    
                                    <Field
                                        name="visible"
                                        component={renderToggleButtonField}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className='w-100'>
                    <CardHeader tag="h5" className='text-center'>Assigned Events</CardHeader>
                    <CardBody>
                        <EventTable {...props} assigned={true}/>
                    </CardBody>
                </Card>
                <Card className='w-100'>
                    <CardHeader tag="h5" className='text-center'>Unassigned Events</CardHeader>
                    <CardBody>
                        <EventTable {...props} assigned={false}/>
                    </CardBody>
                </Card>
                                        
                <div className='d-flex justify-content-end'>
                    <Button disabled={loading} color='danger' type='submit'>{btnLabel}</Button>
                </div>
            </form>
            )}
        </Form>
    )
}

export default LeaderboardForm;