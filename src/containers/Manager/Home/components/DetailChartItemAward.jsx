import React, {useEffect, useState} from 'react';
import { Input } from 'reactstrap';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {connect} from "react-redux";
import {getDashboardAwardDetail} from "@/services/program/getDashboard";
import {useTranslation} from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const selectOptions = [
  {'value': '7days', 'label':'Past 7 Days'},
  {'value': '30days', 'label':'Past 30 Days'},
  {'value': '12month', 'label':'Past 12 Months'},
]
const DurationOptions = () =>(
  selectOptions.map((item, index) =>{
    return <option key={index} value={item.value} >{item.label}</option>
  })
)
const DetailChartItemAward = ({organization, program}) => {
  const {t} = useTranslation();
  const [data, setData] = useState(null);
  const [duration, setDuration] = React.useState('7days');
  const [unit, setUnit] = useState('$');

  const options = unit === '$' ? {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font:{
            size: 20
          },
          callback: function (value) { if (Number.isInteger(value)) { return '$' + value; } },
        }

      },
      x:{
        ticks: {
          font: {
            size: 20
          },
        }
      }
    }
  } : {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          beginAtZero: true,
          font:{
            size: 20
          },
          callback: function (value) { if (Number.isInteger(value)) { return value; } },
          stepSize: 1
        }
      },
      x:{
        ticks: {
          font: {
            size: 20
          },
        }
      }
    }
  };


  const onChange = (e) => {
    setDuration(e.target.value)
  }

  const clickUnit = (val) => {
    setUnit(val)
  }

  useEffect(() => {
    if (organization && program && duration && unit) {
      getDashboardAwardDetail(organization.id, program.id, duration, unit)
        .then((data) => {
          // console.log(data)
          setData(data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [organization, program, duration, unit]);

  if (!data) return t("loading");

  return (
    <div className={`rounded-panel chart-panel index-0`}>
      <div className='title d-flex justify-content-between'>
        <h3>Award Detail</h3>
        <div className='title-right d-flex'>
          <span className='w-50'>
            <span onClick={() => {
              clickUnit('$')
            }} style={{cursor: 'pointer'}}>$</span>&nbsp;/&nbsp;<span onClick={() => {
            clickUnit('#')
          }} style={{cursor: 'pointer'}}>#</span>
          </span>
          <Input type="select" className='dropdowntoggle' defaultValue={duration} name="period" onChange={onChange}>
              <DurationOptions />
          </Input>    
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
)}

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(DetailChartItemAward);
