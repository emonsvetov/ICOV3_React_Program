import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Dropdown,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { TOP_MERCHANTS, TOP_AWARDS  } from './Mockdata';
const TITLES = [
  'Merchants','Awards'
]

const TopPanel = ({type}) => {
  const data = type == 0 ? TOP_MERCHANTS:TOP_AWARDS;
  return (
    <div className={`rounded-panel top-panel index-${type}`}>
      <div className='title d-flex justify-content-between'>
        <h4>Top {TITLES[type]}</h4>
        <div className='title-right d-flex'>
          <span>$ / #</span>        
          <UncontrolledDropdown>
            <DropdownToggle caret className='dropdowntoggle'>
              Select
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Day</DropdownItem>
              <DropdownItem>Month</DropdownItem>
              <DropdownItem>Year</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className='px-4'>
      {
        type == 0? data.map((item, index) => {
          return <div key={index} className="striped-line">
              {item}
            </div>
        }):
        data.map((item, index) => {
          return <div key={index} className="d-flex justify-content-between striped-line">
              <span>{item.type}</span>
              <span>{item.value}</span>
            </div>
        })
      }
      </div>
    </div>
      
)}

export default TopPanel;
