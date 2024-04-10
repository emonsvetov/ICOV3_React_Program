import React, {useEffect, useState} from 'react';
import {Input} from 'reactstrap';
import { getDashboardTopAwards } from '@/services/program/getDashboard'
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

const options = [
  {'value': 'day', 'label': 'Day'},
  {'value': 'month', 'label': 'Month'},
  {'value': 'year', 'label': 'Year'},
]
const DurationOptions = () => (
  options.map((item, index) => {
    return <option key={index} value={item.value}>{item.label}</option>
  })
)

const TopPanelAward = ({organization, program}) => {
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState('month');
  const [unit, setUnit] = useState('$');
  const onChange = (e) => {
    setDuration(e.target.value)
  }

  useEffect(() => {
    if (organization && program && duration && unit) {
      getDashboardTopAwards(organization.id, program.id, duration, unit)
        .then((data) => {
          // console.log(data)
          setData(data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [organization, program, duration, unit]);

  const clickUnit = (val) => {
    setUnit(val)
  }

  if (!data) return t("loading");

  return (
    <div className={`rounded-panel top-panel index-1`}>
      <div className='title d-flex justify-content-between'>
        <h4>Top Awards</h4>
        <div className='title-right d-flex'>
          <span className='w-50'>
            <span onClick={() => {
              clickUnit('$')
            }} style={{cursor: 'pointer'}}>$</span>&nbsp;/&nbsp;<span onClick={() => {
            clickUnit('#')
          }} style={{cursor: 'pointer'}}>#</span>
          </span>
          <Input type="select" className='dropdowntoggle' defaultValue={duration} name="period" onChange={onChange}>
            <DurationOptions/>
          </Input>

        </div>
      </div>
      <div className='px-4 pt-2'>
        {
          data.map((item, index) => {
            return <div key={index} className="d-flex justify-content-between striped-line">
              <span><b>{item.event_name}</b></span>
              <span><b>
                  {unit === '$' ? '$' + item.total.toFixed(2) : item.count}
                </b></span>
            </div>
          })
        }
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(TopPanelAward);
