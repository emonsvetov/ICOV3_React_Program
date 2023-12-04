import React, { useState} from 'react'
import ProgramsHierarchy from '@/shared/components/ProgramsHierarchy'
import {connect} from 'react-redux'

import {Button, Col, Row} from "reactstrap";
import DatePicker from "react-datepicker";
import {CSVLink} from "react-csv";
import {getFirstDay} from '@/shared/helpers'
import {dateStrToYmd} from '@/shared/helpers';
import {isEqual, clone, cloneDeep} from 'lodash';
import {CheckBoxField} from '@/shared/components/form/CheckBox';
import renderSelectField from '@/shared/components/form/Select'
import { Form, Field } from 'react-final-form';
import Select from "react-select";

const defaultFrom = getFirstDay()
const defaultTo = new Date()
const defaultYear = new Date().getFullYear();
const defaultMonth = new Date().toLocaleString('default', { month: 'long' });
const prepareList = () =>{
  let y = new Date().getFullYear();
  let list = [];
  for (var i = y; i > y -10; i --){
    list.push({label: i, value: i})
  }
  return list;
}
const prepareMonthList = () => {
  let list = [];
  var monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
  monthNames.map(
    (month, id) =>{
      list.push({label: month, value: id});
    });
  return list;
}

const AwardSummaryFilter = (
  {
    filter,
    setFilter,
    setUseFilter,
    download,
    exportData,
    exportLink,
    exportHeaders
  }) => {
  const YEAR_LIST = prepareList();
  const MONTH_LIST = prepareMonthList();
  const options = {
    'dateRange': false,
    'year': true,
    'month':true,
    'programs': true,
    'exportToCsv': true,
    'createdOnly': false,
    'reportKey': false,
    'programId': true,
  }
  const [from, setFrom] = React.useState(defaultFrom)
  const [to, setTo] = React.useState(defaultTo)
  const [year, setYear] = React.useState({label: defaultYear, value: defaultYear})
  const [month, setMonth] = React.useState({label: defaultMonth, value: defaultMonth})
  const [createdOnly, setCreatedOnly] = React.useState(false)
  const [reportKey, setReportKey] = React.useState('sku_value')
  const [selectedPrograms, setSelectedPrograms] = useState(filter.programs ? filter.programs : []);
  const finalFilter = {...filter}
  let previous = cloneDeep(finalFilter);

  const onClickFilter = (reset = false, exportToCsv = 0) => {
    let dataSet = {}
    if (options.dateRange) {
      dataSet.from = dateStrToYmd(reset ? defaultFrom : from)
      dataSet.to = dateStrToYmd(reset ? defaultTo : to)
    }
    if (options.programs) {
      dataSet.programs = reset ? [] : clone(selectedPrograms)
    }
    if (options.createdOnly) {
      dataSet.createdOnly = reset ? false : createdOnly
    }
    if (options.reportKey) {
      dataSet.reportKey = reset ? 'sku_value' : reportKey
    }
    if (options.programId) {
      dataSet.programId = filter.programId
    }
    if (options.year) {
      dataSet.year = reset ? {label: defaultYear, value: defaultYear} : year
    }

    if (options.month) {
      dataSet.month = reset ? {label: defaultMonth, value: defaultMonth} : month
    }

    onClickFilterCallback(dataSet)
    previous = dataSet;
    if (reset) {
      setFrom(defaultFrom)
      setTo(defaultTo)
      setSelectedPrograms([]);
      setCreatedOnly(false)
      setReportKey('sku_value')
      setYear({label: defaultYear, value: defaultYear})
    }
  }

  const onClickFilterCallback = (values) => {
    let change = false;

    if (options.programs) {
      if (!isEqual(values.programs, previous.programs)) {
        change = true
      }
    }

    if (options.dateRange) {
      if (finalFilter.from !== values.from || finalFilter.to !== values.to) {
        change = true
      }
    }

    if (options.createdOnly) {
      if (finalFilter.createdOnly !== values.createdOnly) {
        change = true
      }
    }

    if (options.reportKey) {
      if (finalFilter.reportKey !== values.reportKey) {
        change = true
      }
    }

    if (options.year) {
      if (finalFilter.year !== values.year.value) {
        change = true
      }
    }
    if (options.month) {
      if (finalFilter.month !== values.month.value) {
        change = true
      }
    }

    if (!change) {
      alert('No change in filters')
      setUseFilter(false)
      return
    }

    let filters = {}
    if (options.keyword) filters.keyword = values.keyword
    if (options.programs) {
      filters.programs = values.programs
    }
    if (options.programs) {
      filters.programs = values.programs
    }
    if (options.awardLevels) {
      filters.awardLevels = values.awardLevels
    }
    if (options.dateRange) {
      filters.from = values.from
      filters.to = values.to
    }
    if (options.createdOnly) {
      filters.createdOnly = values.createdOnly
    }
    if (options.reportKey) {
      filters.reportKey = values.reportKey
    }
    if (options.year) {
      filters.year = values.year.value
    }

    if (options.month) {
      filters.month = values.month.value
    }
    filters.programId = filter.programId
    filters.programs = filter.programs
    setFilter(filters)
    setUseFilter(true)
  }

  const onStartChange = (value) => {
    setFrom(value)
  }
  const onEndChange = (value) => {
    setTo(value)
  }

  const onChangeCreatedOnly = () => {
    setCreatedOnly(!createdOnly)
  }

  const onChangeRadio = (value) => {
    setReportKey(value)
  }
  const onChangeYear = (value) => {
    setYear(value)
  }
  const onChangeMonth = (value) => {
    setMonth(value)
  }
  return (
    <Row className="table-filter-form form">
      <Col md={8} lg={8} sm={8} className="table-filter-form-fields">
        <div>
          {options.programs &&
            <div className="table-filter-form-col table-filter-form-col1 float-filter" style={{paddingTop: 4}}>
              <div className="form__form-group">
                <div className="form__form-group-field">
                  <div className="form__form-group-row">

                    <ProgramsHierarchy
                      defaultPrograms={options.programs}
                      selectedPrograms={selectedPrograms}
                      setSelectedPrograms={setSelectedPrograms}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          {options.year &&
              <>
                <div className="table-filter-form-col table-filter-form-col2 float-filter" style={{marginTop: "-3px"}}>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Year</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-row">
                        <Select
                            name="year"
                            value={year}
                            onChange={onChangeYear}
                            options={YEAR_LIST}
                            clearable={false}
                            className="react-select"
                            classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
          }
          {options.month &&
              <>
                <div className="table-filter-form-col table-filter-form-col2 float-filter" style={{marginTop: "-3px"}}>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Month</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-row">
                        <Select
                            name="month"
                            value={month}
                            onChange={onChangeMonth}
                            options={MONTH_LIST}
                            clearable={false}
                            className="react-select"
                            classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
          }
          {options.dateRange &&
            <>
              <div className="table-filter-form-col table-filter-form-col2 float-filter">
                <div className="form__form-group">
                  <span className="form__form-group-label">From</span>
                  <div className="form__form-group-field">
                    <div className="form__form-group-row">
                      <DatePicker
                        dateFormat="MM/dd/yyyy"
                        selected={from}
                        onChange={onStartChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-filter-form-col table-filter-form-col2 float-filter">
                <div className="form__form-group">
                  <span className="form__form-group-label">To</span>
                  <div className="form__form-group-field">
                    <div className="form__form-group-row">
                      <DatePicker
                        dateFormat="MM/dd/yyyy"
                        selected={to}
                        onChange={onEndChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
          <div className="clearfix">&nbsp;</div>
          <div className="clearfix">&nbsp;</div>
          {options.createdOnly &&
            <>
              <div className="table-filter-form-col table-filter-form-col2 float-filter">
                <div className="form__form-group">
                  <div className="form__form-group-field">
                    <div className="form__form-group-row">
                      <CheckBoxField name="createdOnly" label="Show participants created only:" checked={createdOnly} onChange={onChangeCreatedOnly}
                                     type="checkbox"/>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </Col>
      <Col className="align-items-center max-height-32px pl-1">
        <Button
          onClick={() => onClickFilter()}
          className="btn btn-sm btn-primary"
          color="#ffffff"
        >Filter</Button>
        <Button
          onClick={() => onClickFilter(true)}
          className="btn btn-sm btn-primary"
          color="#ffffff"
        >Reset</Button>
        {options.exportToCsv &&
          <div>
            <span className="text-blue pointer mr-2" onClick={() => {
              download(filter)
            }}>Export to CSV</span>
            <CSVLink
              data={exportData}
              headers={exportHeaders}
              filename="report.csv"
              className="hidden"
              ref={exportLink}
              target="_blank"
            />
          </div>
        }
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(AwardSummaryFilter);