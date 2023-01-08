import React, { useContext } from "react";
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
import { useTranslation } from "react-i18next";
import TemplateButton from "@/shared/components/TemplateButton";

const IMG_BACK = `${process.env.PUBLIC_URL}/new/img/pages/my-points.jpg`;

const IMG_GIFT = `${process.env.PUBLIC_URL}/original/img/GiftCode_button.png`;
const IMG_MERCHAN = `${process.env.PUBLIC_URL}/original/img/Merchandise_button.png`;

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
  const { t } = useTranslation();
  
  console.log("template in MyPoints:", template);

  const MyPointsOrigin = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <SidebarOrigin />
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
              {t("my_points")}
            </h3>
            <div className="origin-table">
              <Table striped bordered hover size="md">
                <thead>
                  <tr>
                    <td colSpan={4} className="title">
                      {" "}
                      {t("points_expirations")}
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th> {t("points_expiring")} December 31, 2023</th>
                    <th> 12800</th>
                  </tr>
                </tbody>
              </Table>
            </div>
            <PointsOrigin
              title={t("points_summary")}
              table_columns={SUMMARY_COLUMNS}
              table_data={POINTS_SUMMARY_DATA}
            />
            <PointsOrigin
              title={t("points_detail")}
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
          <div className="title">{t("my_points")}</div>
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
    (template?.name === "New" && <MyPointsNew />) ||
    (template?.name === "Original" && <MyPointsOrigin />)
  );
};

const mapStateToProps = (state) => {
  return {
    template: state.template,
  };
};

export default connect(mapStateToProps)(MyPoints);
