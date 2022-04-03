import React from 'react';
import {useNavigate} from 'react-router-dom';

const SelectMerchantType = () => {
  let navigate = useNavigate();
  return (    
        <div className='select-merchant flex-column'>
            <h3>Select Your Merchant Type</h3>
            <div className='panel p-4 yellow' onClick={() => navigate('/participant/browse-merchants')}>
                <h2>
                    Redeem Your Points To Purchase Whatever You'd Like From Leading U.S. Merchants
                </h2>
                <h4>
                    Including:
                    Department & Specialty
                    Stores, On-line Retailers,
                    Restaurants, Entertainment & More!
                </h4>
            </div>

            <div className='panel mt-3 p-4 red' onClick={() => navigate('/participant/browse-merchants')}>
                <h2>Redeem Your Points </h2>
                <h4>
                    To Purchase Merchandise,
                    Travel, Events, Charities & More Shipped Directly
                </h4>
                <h2>To You In Your Home Country!</h2>
            </div>
        </div>
    
)}

export default SelectMerchantType;