import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { PDF } from "@/containers/Participant/Training/components/PDF";
import { Col, Container, Row } from "reactstrap";
import { Sidebar, SidebarOrigin } from "@/containers/Layout/sidebar";
import { useTranslation } from "react-i18next";
import { ParticipantTabNavs } from "@/shared/components/tabNavs";
import axios from 'axios'

const Media = ({ template, auth, program, organization }) => {
  const [media, setMedia] = useState([]);
  const { t } = useTranslation();

  let params = useParams();

  const getData = async ({categoryId}) => {
    const url = axios.defaults.baseURL + `/organization/${organization.id}/program/${program.id}/media/${categoryId}`;
    try {
      const response = await axios.get(url);
      setMedia(response.data);
      return response.data;
    } catch (e) {
      throw new Error(`API error:${e?.message}`);
    }
  }

  useEffect(() => {
    getData(params);
  }, [params]);

  return (
    <Row className="mt-4">
      <Col md={4}>
        <SidebarOrigin />
      </Col>

      <Col md={3}>
        <div className="pdf-link">
          <h2 className="text-uppercase text-center mb-5">{t("media")}</h2>
            {media.map((file, index) => {
                const img = process.env.REACT_APP_API_STORAGE_URL + '/' + file.icon_path;
                const link = process.env.REACT_APP_API_STORAGE_URL + '/' + file.path;;
                const title = file.name;
                const hrefStyle = {};
                const iconStyle = {height: '150px'};
                const contStyle = {margin: '15px'};

                const props = {img, link, title, contStyle, hrefStyle, iconStyle};
                return (
                    <div className="d-flex" >
                        <PDF props={props} />
                    </div>
                );
            })}
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

export default connect(mapStateToProps)(Media);