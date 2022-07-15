import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
};

const TITLES = [
  'Award','Peer Award'
]
const selectOptions = [
  {'value': -1, 'label':'Select'},
  {'value': 0, 'label':'Past 7 Days'},
  {'value': 1, 'label':'Past 30 Days'},
  {'value': 2, 'label':'Past 12 Months'},
]
const DurationOptions = () =>(
  selectOptions.map((item, index) =>{
    if(index == 0){
      return <option key={index} value={item.value} disabled>{item.label}</option>
    }
    else{
      return <option key={index} value={item.value} >{item.label}</option>
    }
  })
)
const DetailCharItem = ({type, data}) => {
  // const {title, data, duration} = props.data;
  const [duration, setDuration] = React.useState(-1);
  const onChange = (e) => {
    setDuration(e.target.value)
    .then( p => {
        //
        window.location.reload()
    }) 
  }
  return (
    <div className={`rounded-panel chart-panel index-${type}`}>
      <div className='title d-flex justify-content-between'>
        <h3>{TITLES[type]} Detail</h3>
        <div className='title-right d-flex'>
          <span className='w-50'>$ / #</span>
          <Input type="select" className='dropdowntoggle' defaultValue={duration} name="period" onChange={onChange}>
              <DurationOptions />
          </Input>    
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
)}

export default DetailCharItem;
