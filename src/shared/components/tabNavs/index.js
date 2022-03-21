import React from 'react';
import PropTypes from 'prop-types';
import TabNav from './components/Tabnav';
import { Container } from 'reactstrap';
import './style.scss'; 

const PARTICIPANT_ITEMS = [
    {title:"REDEEM MY POINTS", icon:"redeem"},
    {title:"MY GIFT CODES", icon:"gift"},
    {title:"SURVEY", icon:"survey"},
    {title:"NEWSLETTER", icon:"newsletter"},
    {title:"SUBMIT A LEAD", icon:"submit"},  
  ]

const MANAGER_ITEMS = [
{title:"Dashboard", icon:"dashboard"},
{title:"nSpire Wall", icon:"spire"},
{title:"Leaderboard", icon:"leaderboard"},

]

export const ParticipantTabNavs = (props ) => {   
    
    return <div className='tab-navs items-5'>
                <ul className='horizontal'>
                {PARTICIPANT_ITEMS.map((item, key )=> {
                    return <li key={key}>
                        <TabNav title={item.title} icon={item.icon} />
                    </li>
                    }
                )}  
                </ul>
            </div>
}

export const ManagerTabNavs = (props ) => {   
    
    return <div className='tab-navs items-3'>
                <ul className='horizontal'>
                {MANAGER_ITEMS.map((item, key )=> {
                    return <li key={key}>
                        <TabNav title={item.title} icon={item.icon} />
                    </li>
                    }
                )}  
                </ul>
            </div>
}
