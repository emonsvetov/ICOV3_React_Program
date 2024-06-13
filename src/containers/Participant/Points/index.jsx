import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "../../Layout/sidebar";
import PointsSummary from "./components/PointsSummary";
import PointsDetail from "./components/PointsDetail";

import TablePointsExpiration from "./components/TablePointsExpiration";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getParticipantMypointsAction } from '@/redux/actions/userActions';
import Select from "react-select";
import ConfirmationModal from "./components/ConfirmationModal";
import { getAuthUser, getAuthProgram } from "@/containers/App/auth";
import axios from 'axios';

const IMG_GIFT = `${process.env.PUBLIC_URL}/theme/clear/img/GiftCode_button.png`;
const IMG_MERCHAN = `${process.env.PUBLIC_URL}/theme/clear/img/Merchandise_button.png`;
const authProgram = getAuthProgram();

const RedeemBtn = ({ props }) => {
  const { src, link } = props;
  const [isOpen, setOpen] = useState(false);

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
  const [selectedCountry, setSelectedCountry] = useState(false);

  // console.log(template)

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

  // console.log(myPoints)

  const factor_valuation = program.factor_valuation

  let points_summary = myPoints?.points_summary ? myPoints.points_summary : []

  // console.log(myPoints)
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

  const GLOBAL_MERCHANTS = [
    { label: "Australia", value: "AU" },
    { label: "Austria", value: "AT" },
    { label: "Belgium", value: "BE" },
    { label: "Brazil", value: "BR" },
    { label: "Bulgaria", value: "BG" },
    { label: "Canada", value: "CA" },
    { label: "Chile", value: "CL" },
    { label: "China", value: "CN" },
    { label: "Costa Rica", value: "CR" },
    { label: "Denmark", value: "DK" },
    { label: "Egypt", value: "EG" },
    { label: "Finland", value: "FI" },
    { label: "France, Metropolitan", value: "FR" },
    { label: "Germany", value: "DE" },
    { label: "Hong Kong", value: "HK" },
    { label: "India", value: "IN" },
    { label: "Indonesia", value: "ID" },
    { label: "Ireland", value: "IE" },
    { label: "Israel", value: "IL" },
    { label: "Italy", value: "IT" },
    { label: "Japan", value: "JP" },
    { label: "Korea, Republic of", value: "KR" },
    { label: "Mexico", value: "MX" },
    { label: "Netherlands", value: "NL" },
    { label: "New Zealand", value: "NZ" },
    { label: "Poland", value: "PL" },
    { label: "Russian Federation", value: "RU" },
    { label: "Singapore", value: "SG" },
    { label: "Spain", value: "ES" },
    { label: "Sweden", value: "SE" },
    { label: "Switzerland", value: "CH" },
    { label: "Taiwan", value: "TW" },
    { label: "Thailand", value: "TH" },
    { label: "United Arab Emirates", value: "AE" },
    { label: "United Kingdom", value: "GB" },
    { label: "United States", value: "US" },
  ];

  const createBasicAuthToken = (username, password) => {
    const token = `${username}:${password}`;
    return `Basic ${btoa(token)}`;
  }

  const handleHMIService = async () => {
    console.log('button clicked')
    const user = getAuthUser();
    const program = getAuthProgram();
    const userData = [{
      userId: (user.account_holder_id).toString(),
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      status: "A",
      countryCode: selectedCountry,
      groupName: "Everyone"
    }]

    getBalance();

    const authToken = createBasicAuthToken(process.env.HMI_AUTH_KEY_NAME, process.env.HMI_AUTH_SECRET);
    const config = {
      headers: {
        // 'Authorization': 'BasicaW5jZW50Y286dGVzdA==',
        'Authorization': authToken,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.get(`https://www.awardhdqtrs.net/awardsnetdev/api/user?userId=${user.account_holder_id}&count=1`, config);
    if(response.data.length == 0) {
      createUserOnHMI(userData)
    } else {
      let ssoLink = `http://jay-sso.dev.incentco.net/simplesaml/saml2/idp/SSOService.php?spentityid=AwardsnetSSO&target=${response.data[0].enrollmentId}||${response.data[0].email}&ReturnTo=http://demo13.incentco.local:3002/participant/my-points`
      window.open(ssoLink, '_blank').focus();
    }
  }

  const createUserOnHMI = async (userData) => {
    try {
      const authToken = createBasicAuthToken(process.env.HMI_AUTH_KEY_NAME, process.env.HMI_AUTH_SECRET);
      const config = {
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(`https://www.awardhdqtrs.net/awardsnetdev/api/user`, userData, config);
      let ssoLink = `http://jay-sso.dev.incentco.net/simplesaml/saml2/idp/SSOService.php?spentityid=AwardsnetSSO&target=${response.data[0].enrollmentId}||${response.data[0].email}&ReturnTo=http://demo13.incentco.local:3002/participant/my-points`
      window.open(ssoLink, '_blank').focus();
    } catch(error) {
      console.log(error);
    }
  }

  const getBalance = async () => {
    const user = getAuthUser();
    try {
      const authToken = createBasicAuthToken(process.env.HMI_AUTH_KEY_NAME, process.env.HMI_AUTH_SECRET);
      const config = {
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.get(`https://www.awardhdqtrs.net/awardsnetdev/api/balance?userId=${user.account_holder_id}`, config);
    } catch(error) {
      console.log(error);
    }
  }

  // console.log(points_summary)

  return (
    <Container fluid>
      <Row className="mt-4">
        <div className="space-30"></div>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <div className="d-flex justify-content-around">
            <RedeemBtn
              props={{ src: IMG_GIFT, link: "/participant/browse-merchants" }}
            />
            {(authProgram && authProgram.allow_third_party === 1) && 
            <>
            <div>

              <RedeemBtn props={{ src: IMG_MERCHAN,
                // link: "/participant/select-global-merchant",
              }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }} >
                <Select
                  options={GLOBAL_MERCHANTS}
                  defaultValue={GLOBAL_MERCHANTS[0]}
                  onChange={(item) => setSelectedCountry(item)}
                  className="react-select"
                  classNamePrefix="react-select"
                  />
                  <button onClick={handleHMIService}>Visit Site</button>
              </div>
            </div>
            </>}
          </div>
          <h3 className="pt-5" style={{ fontSize: "16px" }}>
            {/*{" "}*/}
            {/*{t("my_points")}*/}
          </h3>
          <div className={`${template.name}-table`}>
            <PointsSummary />
          </div>
          <div className={`${template.name}-table`}>
            {myPoints.expiration && <TablePointsExpiration />}
          </div>
          <div className={`${template.name}-table`}>
            <PointsDetail />
          </div>
        </Col>
      </Row>
    </Container>
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