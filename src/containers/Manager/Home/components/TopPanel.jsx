import React from 'react';
import { Input} from 'reactstrap';

import { TOP_MERCHANTS, TOP_AWARDS  } from './Mockdata';
const TITLES = [
  'Merchants','Awards'
]
const options = [
  {'value': -1, 'label':'Select'},
  {'value': 0, 'label':'Day'},
  {'value': 1, 'label':'Month'},
  {'value': 2, 'label':'Year'},
]
const DurationOptions = () =>(
  options.map((item, index) =>{
    if(index == 0){
      return <option key={index} value={item.value} disabled>{item.label}</option>
    }
    else{
      return <option key={index} value={item.value} >{item.label}</option>
    }
  })
)

const TopPanel = ({type}) => {
  const data = type == 0 ? TOP_MERCHANTS:TOP_AWARDS;
  const [duration, setDuration ] = React.useState(-1);
  const onChange = (e) => {
    setDuration(e.target.value)
    .then( p => {
        //
        window.location.reload()
    })  
  }

  return (
    <div className={`rounded-panel top-panel index-${type}`}>
      <div className='title d-flex justify-content-between'>
        <h4>Top {TITLES[type]}</h4>
        <div className='title-right d-flex'>
          <span className='w-50'>$ / #</span>    
          <Input type="select" className='dropdowntoggle' defaultValue={duration} name="period" onChange={onChange}>
              <DurationOptions />
          </Input>    
          
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
