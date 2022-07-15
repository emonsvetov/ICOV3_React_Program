import React, {useState} from 'react';
import { 
  Container, 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Row, 
  Col
} from 'reactstrap';
import classnames from 'classnames';
import LeaderboardTable from '../components/LeaderboardTable';

const LEADERBOARDS = [
  { id: 21, name: 'Team Leaderboard' },
  { id: 28, name: 'Great Reviews' }
];

const Leaderboards = () => {
  const [activeTab, setActiveTab] = useState(0);  
  const toggle = (tab) => {
    if (activeTab !== tab) {
      
        setActiveTab(tab);
    }
  }
  return (
    <Container className='leaderboards'>
      
      {/* <div className='navbar mb-3'>
      <nav className="navs">
          <ul className="horizontal">
            {LINKS.map((item, index) =>{
                return <li key={index}>
                  <NavLink href={item.to} onClick={() =>setActiveTab(index)} className={activeTab == index ? "active": ""}>
                    {item.text}
                  </NavLink>
              </li>
            })}
          </ul>
      </nav>
      </div>   */}
      <Nav tabs>
            {
              LEADERBOARDS.map((item, index) =>{

                return <NavItem key={index} className={'cursor-pointer'}>
                          <NavLink 
                          className={classnames({ active: activeTab === index })}
                          onClick={() => { toggle(index); }}
                        >
                          {item.name}
                        </NavLink>
                        </NavItem>
              })
            }
        </Nav>
        <TabContent activeTab={activeTab}>
          {
            LEADERBOARDS.map((item, index) =>{

              return <TabPane tabId={index} key={index}>
                      <LeaderboardTable id={item.id}/>   
                  </TabPane>
            })
          }
          
                 
        </TabContent>
    </Container>
)}

export default Leaderboards;
