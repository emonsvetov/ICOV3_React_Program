import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import SocialWallPanel from "@/containers/Participant/Home/socialWall/SocialWallPanel";
import { SliderClassic, SliderClear, getMerchantLogos } from "./components/slider";
import {
  ParticipantTabNavs
} from "@/shared/components/tabNavs";
import { connect } from "react-redux";
import { USER_STATUS_PENDING_DEACTIVATION } from "@/services/user/getUser";
import SlideOutMenu from "./components/slide-out-menu";
import Points from "../../Layout/sidebar/Points";
import { useTranslation } from "react-i18next";

const Home = ({ auth, organization, program, template }) => {
  const { t } = useTranslation();
  let props = {
    organization,
    program,
  };
  let [showSocialWall, setShowSocialWall] = useState(null);

  useEffect(() => {
    let result = false;
    if (auth && program) {
      if (
        auth.user_status_id === USER_STATUS_PENDING_DEACTIVATION &&
        program.remove_social_from_pending_deactivation
      ) {
        result = false;
      } else if (program.uses_social_wall > 0) {
        result = true;
      }
    }
    setShowSocialWall(result);
  }, [auth, program]);

  if (!auth || !program || !template) return t("loading");
  let merchant_logos = getMerchantLogos();

  const HomeClear = () => {
    const IMG_BACK = template.hero_banner
      ? `${process.env.REACT_APP_API_STORAGE_URL}/${template.hero_banner}`
      : `${process.env.PUBLIC_URL}/theme/clear/img/back.jpg`;
    return (
      <>
        <div className="mainboard">
          <div className="homeImgWrap">
            <img src={IMG_BACK} />
          </div>
          <SlideOutMenu isFixed={false} />
        </div>
        <Container className={`${template.name} mt-5`} fluid>
          <Row>
            <Col md={3}>
              <Points />
            </Col>
            <Col md={9}>
              <ParticipantTabNavs program={program} />
            </Col>
          </Row>
        </Container>
        <Container className="">
          {showSocialWall && (
              <>
                <SocialWallPanel />
              </>
          )}
        </Container>
        <div className="mt-5">
          <h6 className="m-3">
            {t("select_a_merchant_to_redeem_your_points")}
          </h6>
          <SliderClear data={merchant_logos} />
        </div>
      </>
    );
  };
  const HomeClassic = () => {
    const IMG_BACK = template.hero_banner
      ? `${process.env.REACT_APP_API_STORAGE_URL}/${template.hero_banner}`
      : `${process.env.PUBLIC_URL}/theme/classic/img/back.png`;
    return (
      <>
        <div className={"mainboard d-flex"}>
          <SlideOutMenu isFixed={true} />
          <div className="homeImgWrap">
              <img src={IMG_BACK} />
          </div>
        </div>
        <Container>
          <ParticipantTabNavs program={program} />
        </Container>
        <Container>
          <Row>
            <Col md={9}>
              <div className="dashboard">
                {showSocialWall && (
                  <>
                    <SocialWallPanel />
                  </>
                )}
                <div className="mt-5">
                  <h3>{t("select_a_merchant_to_redeem_your_points")}</h3>
                  <SliderClassic data={merchant_logos} />
                </div>
              </div>
            </Col>
            <Col md={3} className="mt-2">
              <Points />
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  return (
    (template?.name === "clear" && <HomeClear />) ||
    (template?.name === "classic" && <HomeClassic />)
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
    template: state.template,
  };
};
export default connect(mapStateToProps)(Home);
