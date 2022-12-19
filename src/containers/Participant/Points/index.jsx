import React from "react";
import { Link } from "react-router-dom";
import { Table, Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar, SidebarOrigin } from "../../Layout/sidebar";
import PointsSummary from "./components/PointsSummary";
import PointsDetail from "./components/PointsDetail";
import { PointsOrigin } from "./components/PointsOriginTables";
import { POINTS_DETAIL_DATA, POINTS_SUMMARY_DATA } from "./components/Mockdata";
import { DETAIL_COLUMNS, SUMMARY_COLUMNS } from "./components/columns";
import { connect } from "react-redux";

const IMG_BACK = `${process.env.PUBLIC_URL}/img/pages/my-points.jpg`;

const IMG_GIFT = `${process.env.PUBLIC_URL}/img/origin_rewards/GiftCode_button.png`;
const IMG_MERCHAN = `${process.env.PUBLIC_URL}/img/origin_rewards/Merchandise_button.png`;

const RedeemBtn = ({ props }) => {
  const { src, link } = props;
  return (
    <div className="redeem-btn">
      <Link to={link}>
        <img src={src} alt={link} />
      </Link>
    </div>
  );
};
const MyPoints = ({ template }) => {
  const isOriginTheme = template?.type == "origin";
  console.log("template in MyPoints:", template);

  const MyPointsOrigin = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
          </Col>
          <Col md={8} className="">
            <div className="d-flex justify-content-around">
              <RedeemBtn
                props={{ src: IMG_GIFT, link: "/participant/browse-merchants" }}
              />
              <RedeemBtn
                props={{
                  src: IMG_MERCHAN,
                  link: "/participant/select-global-merchant",
                }}
              />
            </div>
            <h3 className="pt-5" style={{ fontSize: "16px" }}>
              {" "}
              My Points
            </h3>
            <div className="origin-table">
              <Table striped bordered hover size="md">
                <thead>
                  <tr>
                    <td colSpan={4} className="title">
                      {" "}
                      {"Points Expirations"}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th> Points expiring December 31, 2023</th>
                    <th> 12800</th>
                  </tr>
                </tbody>
              </Table>
            </div>
            <PointsOrigin
              title="Points Summary"
              table_columns={SUMMARY_COLUMNS}
              table_data={POINTS_SUMMARY_DATA}
            />
            <PointsOrigin
              title="Points Detail"
              table_columns={DETAIL_COLUMNS}
              table_data={POINTS_DETAIL_DATA}
            />
          </Col>
        </Row>
      </Container>
    );
  };
  const MyPointsNew = () => {
    return (
      <>
        <div className="mainboard">
          <img src={IMG_BACK} alt={"my_points"} />
          <div className="title">My Points</div>
        </div>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                <PointsSummary />

                <PointsDetail />
              </div>
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return (
    (!isOriginTheme && <MyPointsNew />) || (isOriginTheme && <MyPointsOrigin />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(MyPoints);
