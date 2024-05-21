import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getMerchants } from "@/services/program/getMerchants";
import {useTranslation} from "react-i18next";

// const getMerchants = () =>{
//     let array = [];
//     for(let i = 1 ; i<= 25; i ++){
//         let item = {};
//         item.logo = `/img/merchants/${i}.png`;
//         item.no = i + 203675;
//         array.push(item);
//     }
//     return array;
// }

const BrowseMerchant = ({ organization, program }) => {
  const [merchants, setMerchants] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    if (organization && program) {
      getMerchants(organization.id, program.id).then((payload) => {
        setMerchants(payload?.merchants ? payload.merchants : payload);
      });
    }
  }, [organization, program]);

  //   const merchants = getMerchants();
  // console.log(merchants)
  let navigate = useNavigate();
  const LOGO_PUBLIC_URL = `${process.env.REACT_APP_API_STORAGE_URL}`;
  //   console.log(LOGO_PUBLIC_URL)
  return (
    <div className="browse-merchants">
      <h5>{t('our_merchants')}</h5>
      <Row className="merchants-thumbnail">
        {merchants.map((item, index) => {
          return (
            <Col
              md={2}
              className="item"
              key={index}
              onClick={() => navigate(`/participant/redeem/${item.id}`)}
            >
              <img src={`${LOGO_PUBLIC_URL}/${item.logo}`} alt="logo" />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    organization: state.organization,
    program: state.program,
  };
};

export default connect(mapStateToProps)(BrowseMerchant);
