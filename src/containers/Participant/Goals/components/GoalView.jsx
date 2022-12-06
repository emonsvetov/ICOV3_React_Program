import React, { useState, useEffect } from "react";
import { Table, Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { useTable, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { ParticipantTabNavs } from "../../../../shared/components/tabNavs";
import { SidebarOrigin, Sidebar } from "../../../Layout/sidebar/index";
import { useParams, useNavigate } from "react-router-dom";
import { GOAL_DATA } from "./Mockdata";
import { GOAL_COLUMNS, GOAL_SUMMARY_COLUMNS } from "./columns";
import TemplateButton from "@/shared/components/TemplateButton";

const GoalView = ({ template }) => {
  const isOriginTheme = template?.type == "origin";
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // getEvent(organization.id, program.id, eventId)
    // .then(item => {
    //     // console.log(item)
    //     setEvent(item)
    //     toggle('EditEvent');
    //     setLoading(false)
    // })
    setGoal(GOAL_DATA[0]);
  }, [goalId]);

  const GoalNew = () => {
    return (
      <>
        <Container>
          <ParticipantTabNavs />
          <Row>
            <Col md={9}>
              <div className="dashboard">My Goals</div>
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  const columns = React.useMemo(() => GOAL_COLUMNS, []);
  const summary_columns = React.useMemo(() => GOAL_SUMMARY_COLUMNS, []);

  const GoalOrigin = () => {
    return (
      <>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
          </Col>
          <Col md={8} className="">
            <h3 className="pt-1" style={{ fontSize: "16px" }}>
              {" "}
              My Goals
            </h3>
            <Row>
              <Col md={4} className="gauge">
                <div className="gauge__body">
                  <div className="gauge__fill" style={{ width: `${50}%` }} />
                  <div className="gauge__cover">
                    <div className="text__cover">50%</div>
                  </div>
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={7}>
                <div className="origin-table">
                  <Table className="goal-table">
                    <thead>
                      <tr>
                        <td colspan="2" class="title">
                          Goal Information
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {columns.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td class="title-col">{item.Header}</td>
                            <td class="value">Employee Referral </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Table className="goal-summary-table">
                    <tbody>
                      <tr>
                        {summary_columns.map((item, index) => (
                          <th key={index} class="title-col">
                            {item.Header}
                          </th>
                        ))}
                      </tr>
                      <tr>
                        {summary_columns.map((item, index) => (
                          <td key={index} class="title-col">
                            {"****"}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <TemplateButton
                className=""
                onClick={() => navigate(`/participant/my-goals`)}
                text="Return to My Goals"
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  return (isOriginTheme && <GoalOrigin />) || (!isOriginTheme && <GoalNew />);
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};
export default connect(mapStateToProps)(GoalView);
