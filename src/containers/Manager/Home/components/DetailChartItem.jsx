import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'reactstrap';
import { Dropdown,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
const DetailCharItem = ({type, data}) => {
  // const {title, data, duration} = props.data;
  return (
    <div className={`rounded-panel chart-panel index-${type}`}>
      <div className='title d-flex justify-content-between'>
        <h3>{TITLES[type]} Detail</h3>
        <div className='title-right d-flex'>
          <span>$ / #</span>
          <UncontrolledDropdown >
            <DropdownToggle caret className='dropdowntoggle'>
              Select
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Past 7 Days</DropdownItem>  
              <DropdownItem>Past 30 Days</DropdownItem>
              <DropdownItem>Past 12 Months</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
)}

export default DetailCharItem;
