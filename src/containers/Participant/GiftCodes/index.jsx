import React, {useContext, useEffect, useState} from "react";
import { Col, Container, Row } from "reactstrap";
import { ParticipantTabNavs } from "../../../shared/components/tabNavs";
import GiftCard from "./components/GiftCard";
import GiftCardOriginal from "./components/GiftCardOriginal";
import giftData from "./components/Mockdata.json";
import { connect } from "react-redux";
import Sidebar from "../../Layout/sidebar";
import { useTranslation } from "react-i18next";
import {getGiftCodes} from '@/services/user/getGiftCodes'

const IMG_BACK = `${process.env.PUBLIC_URL}/theme/classic/img/pages/my-gift-codes.jpg`;

const MyGiftCodes = ({ template, auth, organization, program }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  let [giftCodes, setGiftCodes] = useState(null);

  useEffect(() => {
    if (organization && program) {
      setLoading(true);
      getGiftCodes(organization.id, program.id, auth.id)
        .then((data) => {
          // console.log(data)
          setGiftCodes(data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [organization, program]);


  const MyGiftCodesOrigin = () => {
    return (
      <Container fluid>
        <Row className="mt-4">
          <div className="space-30"></div>
          <Col md={4}>
            <Sidebar />
          </Col>
          <Col md={7} className="">
            <h3 className="pt-1" style={{ fontSize: "16px" }}>
              {" "}
              {t("my_gift_codes")}
            </h3>
            <div className="dashboard">
              {giftCodes ? giftCodes.map((item, index) => {
                return <GiftCardOriginal key={index} data={item} />;
              }) :
                <p className="text-center">{t("no_gift_codes")}</p>
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  };

  const MyGiftCodesNew = () => {
    return (
      <>
        <div className="mainboard">
          <img src={IMG_BACK} />
          <div className="title text-dark">{t("my_gift_codes")}</div>
        </div>
        <Container>
          <ParticipantTabNavs />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                {giftCodes ? giftCodes.map((item, index) => {
                    return <GiftCard key={index} data={item} />;
                  }) :
                  <p className="text-center">{t("no_gift_codes")}</p>
                }
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
    (template?.name === "classic" && <MyGiftCodesNew />) ||
    (template?.name === "Clear" && <MyGiftCodesOrigin />)
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

export default connect(mapStateToProps)(MyGiftCodes);
