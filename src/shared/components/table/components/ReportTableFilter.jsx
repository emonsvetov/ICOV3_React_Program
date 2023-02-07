import React from "react"
import {dateStrToYmd} from '@/shared/helper'
import DatePickerField from '@/shared/components/form/DatePicker';
import { Field, Form } from 'react-final-form';
import { Row, Col, Label, FormGroup } from "reactstrap";
const getFirstDayOfMonth = () =>{
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

const defaultFrom = getFirstDayOfMonth()
const defaultTo = new Date()

const ReportTableFilter = ({ config, filter, setFilter}) => {

    const defaultFilters = {
        keyword: '',
        from: defaultFrom,
        to: defaultTo
    }

    const finalFilter = {...defaultFilters, ...filter}

    const defaultConfig = {
        label:'term',
        keyword:false,
        dateRange: true
    }

    const options = {...defaultConfig, ...config}

    // console.log(options)

    const [keyword, setKeyword] = React.useState(finalFilter.keyword)
    const [from, setFrom] = React.useState( finalFilter.from )
    const [to, setTo] = React.useState( finalFilter.to )

    if( options.dateRange ) {
        // setFrom(finalFilter.from)
        // setTo(finalFilter.to)
    }

    const onKeywordChange = (e) => {
        setKeyword( e.target.value )
    }
    const onStartChange = ( value ) => {
        setFrom( value)
    }
    const onEndChange = ( value ) => {
        setTo(  value )
    }
    const onClickFilter = (reset = false) => {
        let dataSet = {}
        if( options.keyword ) {
            dataSet.keyword = reset ? '' : keyword
        }
        if( options.dateRange ) {
            dataSet.from = dateStrToYmd(reset ? defaultFrom : from)
            dataSet.to = dateStrToYmd(reset ? defaultTo : to)
        }
        onClickFilterCallback( dataSet )
        if( reset ) {
            setKeyword('')
            setFrom( defaultFrom )
            setTo( defaultTo )
        }
    }
    const onClickFilterCallback = (values) => {

        // alert(JSON.stringify(finalFilter))
        // alert(JSON.stringify(values))
        var change = false;

        if(options.keyword) {
            if(finalFilter.keyword !== values.keyword)   {
                change = true
            }
        }

        if(options.dateRange) {
            if(finalFilter.from !== values.from || finalFilter.to !== values.to )   {
                change = true
            }
        }

        if( !change )    {
            alert('No change in filters')
            return
        }
        // alert(JSON.stringify(values))
        let filters = {}
        if( options.keyword ) filters.keyword = values.keyword
        if( options.dateRange ) {
            filters.from = values.from
            filters.to = values.to
        }
        // alert(JSON.stringify(filters))
        setFilter( filters )
    }
    return (
            <div className='wrapper d-flex align-items-center'>
                
                {options.dateRange &&  <Row>
                        <Col md={6}>
                            <FormGroup className="d-flex">
                                <Label  className="form-label"> From </Label>
                                <DatePickerField selectedDate={from} name='from' onChange = {() =>{}} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="d-flex">
                                <Label for='picker-to' className="form-label"> To </Label>
                                <DatePickerField selectedDate={to} id='picker-to' name='to' onChange = {() =>{}} />
                            </FormGroup>
                        </Col>
                    </Row>}
            <Col className="align-items-center max-height-32px pl-1">
                <span className="cursor-pointer mr-2" onClick={()=>onClickFilter()}>Filter</span> | 
                <span className="cursor-pointer ml-2" onClick={()=>onClickFilter(true)}>Reset</span>
            </Col>
        </div>
    )
}

export default ReportTableFilter