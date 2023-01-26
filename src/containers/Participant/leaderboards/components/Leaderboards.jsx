import React, { useState, useEffect } from "react";
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
import { getLeaderboardLeaders } from "@/services/program/getLeaderboardLeaders";
import {connect} from "react-redux";
import {t} from "i18next";

const Leaderboards = ({ program, organization }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [leaderboardLeaders, setLeaderboardLeaders] = useState([]);

  useEffect(() => {
    if (organization && program) {
      setLoading(true);
      getLeaderboardLeaders(organization.id, program.id).then((items) => {
        setLeaderboardLeaders(items);
        setLoading(false);
      });
    }
  }, [organization, program]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div className="leaderboards">
      <Nav tabs>
        {leaderboardLeaders.map((item, index) => {
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
        {leaderboardLeaders.map((item, index) => {
          return (
            <TabPane tabId={index} key={index}>
              <LeaderboardTable id={item.id} leaderboard={item} />
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(Leaderboards);
