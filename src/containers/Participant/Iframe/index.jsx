import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import Sidebar from "@/containers/Layout/sidebar";
import { useTranslation } from "react-i18next";
import axios from 'axios'

const Iframe = ({ template, auth, program, organization }) => {
  const [iframe, setIframe] = useState({});

  let params = useParams();
  const getData = async ({categoryId}) => {
    const url = axios.defaults.baseURL + `/organization/${organization?.id}/program/${program?.id}/digital-media-type/${categoryId}`;
    try {
      const response = await axios.get(url);
      if(response.data.length){
        setIframe(response.data[0]);
      }
    } catch (e) {
      throw new Error(`API error:${e?.message}`);
    }
  }

  useEffect(() => {
    if(program && organization)
      getData(params);
  }, [program, organization, params]);

  return (
    <Row className="mt-4">
      <Col md={4}>
        <Sidebar />
      </Col>

      <Col md={8}>
        <div className="pdf-link">
          <h2 className="text-uppercase text-center mb-5"></h2>
          <div className="d-flex flex-row mb-3 flex-wrap mt-4 align-items-center" >
            <iframe src={iframe?.menu_link} className="w-100" style={{height: '500px'}}/>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(Iframe);
