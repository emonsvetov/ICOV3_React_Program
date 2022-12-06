import React, { useState } from "react";
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import LeaderboardTable from "../../../Manager/Home/components/LeaderboardTable";

const LEADERBOARDS = [
  { id: 21, name: "QA 10-31" },
  { id: 28, name: "Employee Referrals" },
];

const Leaderboards = () => {
  const [activeTab, setActiveTab] = useState(0);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <div className="leaderboards">
      <Nav tabs>
        {LEADERBOARDS.map((item, index) => {
          return (
            <NavItem key={index} className={"cursor-pointer"}>
              <NavLink
                className={classnames({ active: activeTab === index })}
                onClick={() => {
                  toggle(index);
                }}
              >
                {item.name}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent activeTab={activeTab}>
        {LEADERBOARDS.map((item, index) => {
          return (
            <TabPane tabId={index} key={index}>
              <LeaderboardTable id={item.id} />
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );
};

export default Leaderboards;
