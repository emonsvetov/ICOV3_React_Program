import React, { useState, useEffect, useContext } from "react";
import { Table, Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import Sidebar from "@/containers/Layout/sidebar";
//import { GOAL_DATA } from "./Mockdata";
import { GOAL_COLUMNS, GOAL_SUMMARY_COLUMNS } from "./columns";
import TemplateButton from "@/shared/components/TemplateButton";
import { useTranslation } from "react-i18next";
import { getUserGoal } from "@/services/program/getUserGoal";
import { readUserGoalProgressDetail } from "@/services/user/readUserGoalProgressDetail";

const GoalView = ({ template, organization, program }) => {
  const { t } = useTranslation();

  const { userGoalId } = useParams();
  const [userGoal, setUserGoal] = useState([]);
  const [userGoalProgress, setUserGoalProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const ProgressPer = (userGoal?.calc_progress_percentage ? (userGoal?.calc_progress_percentage > 100 ? 100 : userGoal.calc_progress_percentage) : 0);
  const navigate = useNavigate();
  console.log(userGoalId);
  useEffect(() => {
    getUserGoal(organization.id, program.id, userGoalId)
      .then(item => {
        setUserGoal(item[0])
        setLoading(false)
      })
    //setUserGoal(GOAL_DATA[0]);
    readUserGoalProgressDetail(organization.id, program.id, userGoalId)
      .then(item => {
        setUserGoalProgress(item)
        setLoading(false)
      })
  }, [userGoalId]);

  const GoalNew = () => {
    return (
      <>
        <Container>
          <ParticipantTabNavs />
          <Row>
            <Col md={9}>
              <div className="dashboard">{t("my_goals")}</div>
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
            <Sidebar />
          </Col>
          <Col md={8} className="">
            <h3 className="pt-1" style={{ fontSize: "16px" }}>
              {" "}
              {t("my_goals")}
            </h3>
            <Row>
              <Col md={4} className="gauge">
                <div className="gauge__body">
                  <div className="gauge__fill" style={{ width: `${ProgressPer}%` }} />
                  <div className="gauge__cover">
                    <div className="text__cover">{ProgressPer}%</div>
                  </div>
                </div>
              </Col>
              <Col md={1}></Col>
              <Col md={7}>
                <div className={`${template.name}-table`}>
                  <Table className="goal-table">
                    <thead>
                      <tr>
                        <td colspan="2" className="title">
                          {t("goal_information")}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        columns.map((item, index) => {
                          let value = '';
                          if (userGoal.id) {
                            switch (item.Header) {
                              case 'Name':
                                value = userGoal.plan_name
                                break;
                              case 'Date Begin':
                                value = new Date(userGoal.date_begin).toLocaleDateString("en-US", {})
                                break;
                              case 'Date End':
                                value = new Date(userGoal.date_end).toLocaleDateString("en-US", {})
                                break;
                              case 'Target':
                                value = Number(userGoal.target_value).toFixed(2)
                                break;
                              case 'Progress':
                                value = `${Number(userGoal.calc_progress_percentage).toFixed(2)}%`
                                break;
                              default:
                                value = ''
                            }
                          }
                          return (
                            <tr key={index}>
                              <td className="title-col">{item.Header}</td>
                              <td className="value">
                                {value}
                              </td>
                            </tr>
                          )
                        })}

                    </tbody>
                  </Table>
                  <Table className="goal-summary-table">
                    <tbody>
                      <tr>
                        {summary_columns.map((item, index) => (
                          <th key={index} className="title-col">
                            {item.Header}
                          </th>
                        ))}
                      </tr>
                      {/*userGoalProgress.map((item, index) => (
                          <td key={index} className="title-col">
                            {"****"}
                          </td>
                        ))*/}
                      {
                        userGoalProgress.map((item, index) => (
                          <tr>
                            <td className="title-col">
                              {`${new Date(item.created_at).toLocaleDateString("en-US", {})}`}
                            </td>
                            <td className="title-col">
                              {item.progress_value}
                            </td>
                            <td className="title-col">
                              {item.comment}
                            </td>
                            <td className="title-col">
                              {item.ref_num}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <TemplateButton
                className=""
                onClick={() => navigate(`/participant/my-goals`)}
                text={t("return_to_my_goals")}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  return (
    (template?.name === "clear" && <GoalOrigin />) ||
    (template?.name === "classic" && <GoalNew />)
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(GoalView);
