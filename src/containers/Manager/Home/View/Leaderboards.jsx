import React, {useEffect, useState} from 'react';
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
import { getLeaderboardLeaders } from "@/services/program/getLeaderboardLeaders";
import {t} from "i18next";
import {connect} from "react-redux";

const Leaderboards = ({ program, organization }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [leaderboardLeaders, setLeaderboardLeaders] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      
        setActiveTab(tab);
    }
  }

  useEffect(() => {
    if (organization && program) {
      setLoading(true);
      getLeaderboardLeaders(organization.id, program.id).then((items) => {
        setLeaderboardLeaders(items);
        setLoading(false);
      });
    }
  }, [organization, program]);

  if (loading) {
    return <p>{t("loading")}</p>;
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
              leaderboardLeaders.map((item, index) =>{

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
            leaderboardLeaders.map((item, index) =>{

              return <TabPane tabId={index} key={index}>
                      <LeaderboardTable id={item.id} leaderboard={item}/>
                  </TabPane>
            })
          }
          
                 
        </TabContent>
    </Container>
)}

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(Leaderboards);
