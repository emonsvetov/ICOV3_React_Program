import React from 'react';
import { Link } from 'react-router-dom';
import PrinterIcon from 'mdi-react/PrinterIcon';

const GiftCard = (props) => {
  const {icon, title, received, code, pin, amount} = props.data;
  return (    
        <div className='panel gift-card d-flex mb-5 rounded-3'>
          <div className='gift-icon-wrapper'>
            <img src={icon} className='gift-icon'></img>
          </div>
          <div className='gift-info d-flex flex-column justify-content-evenly pr-2'>
              <div className='d-flex justify-content-between'>
                <h5>{title}</h5>
                <span>Received:{received}</span>
                <PrinterIcon size={20}/>
              </div>
              <div className='gift-code'>
                <strong>Gift Code #:{code}</strong>
              </div>
              <div className='d-flex justify-content-between'>
                <span>PIN:{pin}</span>
                <Link  to="/" className='redemption_link'> 
                  Redemption Instructions
                </Link>
              </div>
          </div>
          <div className='gift-amount'>
            <div className='amount-wrapper'>
              <h6>${amount.toFixed(2)}</h6>
            </div>
            
          </div>
          
        </div>
    
    
)}

export default GiftCard;