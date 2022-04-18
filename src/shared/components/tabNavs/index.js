import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import TabNav from './components/Tabnav';
import { Container } from 'reactstrap';
import './style.scss'; 
import {useNavigate, useLocation} from 'react-router-dom';

const PARTICIPANT_ITEMS = [
    {title:"REDEEM MY POINTS", icon:"redeem", to:`/participant/select-merchants`},
    {title:"MY GIFT CODES", icon:"gift", to:'/participant/my-gift-codes'},
    {title:"SURVEY", icon:"survey"},
    {title:"NEWSLETTER", icon:"newsletter"},
    {title:"SUBMIT A LEAD", icon:"submit", to:'/participant/lead'},  
  ]

const MANAGER_ITEMS = [
    {title:"Dashboard", icon:"dashboard", to:'/manager/home'},
    {title:"nSpire Wall", icon:"spire", to:`/manager/nspire-wall`},
    {title:"Leaderboard", icon:"leaderboard", to:`/manager/leaderboards`},
]

export const ParticipantTabNavs = (props ) => {   
    let navigate = useNavigate();
    return <div className='tab-navs items-5'>
                <ul className='horizontal'>
                {PARTICIPANT_ITEMS.map((item, key )=> {
                    return <li key={key} onClick={() => navigate(item.to)}>
                        <TabNav title={item.title} icon={item.icon} />
                    </li>
                    }
                )}  
                </ul>
            </div>
}

export const ManagerTabNavs = (props ) => {   
    
    const [path, setPath] = useState(null);
    const location = useLocation();
    useEffect(() => {
        let path = location?.pathname.substring(location.pathname.lastIndexOf('/') + 1 );
        setPath(path);
    },[location])
    let navigate = useNavigate();
    
    return <div className='tab-navs items-3'>
                <ul className='horizontal'>
                {MANAGER_ITEMS.map((item, key )=> {
                    return <li key={key} onClick={() => navigate(item.to)}>
                        <TabNav title={item.title} icon={item.icon} isActive={item.to == location.pathname}/>
                    </li>
                    }
                )}  
                </ul>
            </div>
}
