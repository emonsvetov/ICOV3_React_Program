import React, {useEffect, useState} from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';
import DetailChartItemAward from '../components/DetailChartItemAward';
import DetailChartItemPeerAward from '../components/DetailChartItemPeerAward';
import TodayItem from '../components/TodayItem';
import TopPanelMerchant from '../components/TopPanelMerchant';
import TopPanelAward from '../components/TopPanelAward';
import {getDashboard} from '@/services/program/getDashboard'
import {TODAY_DATA, CHART_DATA} from '../components/Mockdata';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

const Dashboard = ({organization, program}) => {
  const {t} = useTranslation();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organization && program) {
      setLoading(true);
      getDashboard(organization.id, program.id)
        .then((data) => {
          // console.log(data)
          setDashboard(data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [organization, program]);

  if (!dashboard) return t("loading");

  return (
    <Container className='managerboard'>
      <Row>
        <Col md={4} >
          <TodayItem data={dashboard.awardsToday} index="0"/>
        </Col>
        <Col md={4} >
          <TodayItem data={dashboard.redemptionToday} index="1"/>
        </Col>
        <Col md={4} >
          <TodayItem data={dashboard.participantToday} index="2"/>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col md={4}>
          <TopPanelMerchant />
        </Col>
        <Col md={8}>
          <DetailChartItemAward />
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col md={4}>
          <TopPanelAward />
        </Col>
        <Col md={8}>
          <DetailChartItemPeerAward />
        </Col>
      </Row>
    </Container>

  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(Dashboard);
