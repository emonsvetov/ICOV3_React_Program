import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Container, Row, NavLink } from "reactstrap";
import { useLocation  } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SelectProgram from '../components/SelectProgram'
import GoalPlans from './components/GoalPlans'
import ModalWrapper from './components/ModalWrapper';
import Events from "./Events";
import Leaderboards from "./components/Leaderboards";
import TemplateButton from "@/shared/components/TemplateButton";

const ProgramSettings = ({ auth, program, organization }) => {
  // console.log(auth)
  // { to: "#expired-goalplans", text: "Expired Goal Plans" },
  // { to: "#active-goalplans", text: "Active Goal Plans" },
  // { to: "#future-goalplans", text: "Future Goal Plans" },
  // { to: "#leaderboards", text: "Leaderboards" },

  const LINKS = [
    { to: "#events", text: "Events" },
  ];

  if(program?.uses_goal_tracker > 0) {
    LINKS.push({
      to: "#expired-goalplans",
      text: "Expired Goal Plans",
    })
    LINKS.push({
      to: "#active-goalplans",
      text: "Active Goal Plans",
    })
    LINKS.push({
      to: "#create-goalplan",
      text: "Create Goal Plan",
    })
  }

  if(program?.uses_leaderboards
      > 0) {
    LINKS.push({
      to: "#leaderboards",
      text: "Leaderboards",
    })
  }

  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('#events');
  const [isOpen, setOpen] = useState(false);
  const [reloadEvents, setReloadEvents] = useState(false);
  const [reloadLeaderboards, setReloadLeaderboards] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [leaderboard, setLeaderboard] = useState({});
  
  const toggle = (name = null, reload=false) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
    if(reload){
      setReloadEvents(!reloadEvents);
      setReloadLeaderboards(!reloadLeaderboards);
    }
  };

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      for (const i in LINKS) {
        if (LINKS[i]["to"] === hash) {
          setActiveTab(hash);
          break;
        }
      }
    }
  }, [LINKS]);

  if (!auth || !program || !organization) return t("loading");

  return (
    <div className="program-settings">
      <Container>
        <Row className="mt-4">
          <Col md={10}>
            <h3>Rewards Events</h3>
            <span>
              Customize your settings for your own unique program. You can
              create and/or select reward events and insert the default reward
              dollar value for each event. You can also create a templated
              reward message for each event.
            </span>
            <Col md={4} className="d-flex program-select my-3">
              <SelectProgram showRefresh={true}/>
            </Col>
          </Col>
        </Row>
      </Container>
      <div className="navbar mb-3">
        <nav className="navs">
          <ul className="horizontal">
            {LINKS.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    href={item.to}
                    onClick={() => setActiveTab(item.to)}
                    className={activeTab == item.to ? "active" : ""}
                  >
                    {item.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <Container className="settingboard">
        <div className={activeTab != "#events" ? "d-none" : ""} id="events">
          <div className="my-3 d-flex justify-content-between">
            <h3>Events</h3>
            <TemplateButton
              onClick={() => toggle("AddEvent")}
              text="Add New Event"
            />
          </div>
          <div className="points-summary-table">
            <Events program={program} organization={organization} reload={reloadEvents} />
          </div>
        </div>

        <div className={activeTab != "#expired-goalplans" ? "d-none" : ""} id="expired-goalplans">
          <div className="my-3 d-flex justify-content-between">
            <h3>Goal Plans</h3>
            <TemplateButton
              onClick={() => toggle("AddGoalPlan")}
              text="Add New Goal Plan"
            />
          </div>
          <div className="expired-goalplan-table">
            <GoalPlans
              program={program}
              organization={organization}
              status="Expired"
            />
          </div>
        </div>

        <div className={activeTab != "#active-goalplans" ? "d-none" : ""} id="active-goalplans">
          <div className="my-3 d-flex justify-content-between">
            <h3>Goal Plans</h3>
            <TemplateButton
              onClick={() => toggle("AddGoalPlan")}
              text="Add New Goal Plan"
            />
          </div>
          <div className="active-goalplan-table">
              <GoalPlans
                program={program}
                organization={organization}
                status="Active"
              />
          </div>
        </div>

        <div className={activeTab != "#create-goalplan" ? "d-none" : ""} id="create-goalplan">
          <div className="my-3 d-flex justify-content-between">
            <h3>Goal Plans</h3>
            <TemplateButton
              onClick={() => toggle("AddGoalPlan")}
              text="Add New Goal Plan"
            />
          </div>
          <div className="create-goalplan-table">
              <GoalPlans
                program={program}
                organization={organization}
                status="Future"
              />
          </div>
        </div>

        <div className={activeTab != "#leaderboards" ? "d-none" : ""} id="leaderboards">
          <div className="my-3 d-flex justify-content-between">
            <h3>Leaderboards</h3>
            <TemplateButton
              onClick={() => toggle("AddLeaderboard")}
              text="Add New Leaderboard"
            />
          </div>
          <div className="leaderboard-table">
            <Leaderboards program={program} organization={organization} leaderboard={leaderboard} setLeaderboard={setLeaderboard} reload={reloadLeaderboards} />
          </div>
        </div>
      </Container>

      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
        leaderboard = {leaderboard}
        setLeaderboard = {setLeaderboard}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(ProgramSettings);
