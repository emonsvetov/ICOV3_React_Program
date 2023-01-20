import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import { Sidebar, SidebarOrigin } from "../../Layout/sidebar";
import PointsSummary from "./components/PointsSummary";
import PointsDetail from "./components/PointsDetail";
import PointsTemplateTable from "./components/PointsOriginTables";
import TablePointsExpiration from "./components/TablePointsExpiration";
import { POINTS_DETAIL_DATA, POINTS_SUMMARY_DATA } from "./components/Mockdata";
import { DETAIL_COLUMNS, SUMMARY_COLUMNS, EXPIRATION_COLUMNS } from "./components/columns";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getParticipantMypointsAction } from '@/redux/actions/userActions';

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

const MyPoints = ({ dispatch, auth, program, template, myPoints, pointBalance }) => {
  const { t } = useTranslation();

  useEffect( () => {
    if( auth?.id && program?.id)
    {
      dispatch(
        getParticipantMypointsAction(
          program.organization_id, 
          program.id,
          auth.id
        )
      )
    }
  }, [auth, program])

  if( !myPoints ) return 'loading...'

  const factor_valuation = program.factor_valuation

  let points_summary = myPoints.points_summary

  console.log(myPoints)
  points_summary = [...points_summary, {
    'name': 'Points Redeemed',
    'points': parseInt(myPoints.points_redeemed * factor_valuation)
  }, {
    'name': 'Points Reclaimed',
    'points': parseInt(myPoints.points_reclaimed * factor_valuation)
  }, {
    'name': 'Points Expired',
    'points': parseInt(myPoints.points_expired * factor_valuation)
  }, {
    'name': 'Your points balance',
    'points': parseInt(pointBalance.points)
  }]

  // console.log(points_summary)

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
              <TablePointsExpiration />
            </div>
            <PointsTemplateTable
              title={t("points_summary")}
              table_columns={SUMMARY_COLUMNS}
              table_data={points_summary}
            />
            <PointsTemplateTable
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
    program: state.program,
    auth: state.auth,
    myPoints: state.participant.myPoints,
    pointBalance: state.pointBalance,
  };
};

export default connect(mapStateToProps)(MyPoints);
