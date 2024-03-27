import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { PDF } from "@/containers/Participant/Training/components/PDF";
import { Col, Container, Row } from "reactstrap";
import Sidebar from "@/containers/Layout/sidebar";
import { useTranslation } from "react-i18next";
import axios from 'axios'

const Iframe = ({ template, auth, program, organization }) => {
  const [iframe, setIframe] = useState({});

  let params = useParams();
  const getData = async ({categoryId}) => {
    const url = axios.defaults.baseURL + `/organization/${organization?.id}/program/${program?.id}/digital-media-type`;
    try {
      const response = await axios.get(url);
      if(response.data.length){
        let result = response.data.filter((item) => item.program_media_type_id == categoryId );
        if(result)
          setIframe(result[0]);
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
    <Container fluid>
      <Row className="mt-4">
        <Col md={2}>
          <Sidebar />
        </Col>

        <Col md={10}>
          <div className="pdf-link">
            <h2 className="text-uppercase text-center mb-5"></h2>
            <div className="d-flex flex-row mb-3 flex-wrap mt-4 align-items-center" >
              <iframe src={iframe?.menu_link} className="w-100" style={{height: 'calc(100vh - 150px)'}}/>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
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
