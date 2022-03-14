import React from 'react';
import PropTypes from 'prop-types';
import TabNav from './components/Tabnav';
import { Container } from 'reactstrap';
import './style.scss'; 

const tab_nav_items = [
    {title:"REDEEM MY POINTS", icon:"redeem"},
    {title:"MY GIFT CODES", icon:"gift"},
    {title:"SURVEY", icon:"survey"},
    {title:"NEWSLETTER", icon:"newsletter"},
    {title:"SUBMIT A LEAD", icon:"submit"},  
  ]

function TabNavs(props ) {   
    
    return <Container className='tab-navs'>
                <ul className='horizontal'>
                {tab_nav_items.map((item, key )=> {
                    return <li key={key}>
                        <TabNav title={item.title} icon={item.icon} />
                    </li>
                    }
                )}  
                </ul>
            </Container>
}



export default TabNavs;