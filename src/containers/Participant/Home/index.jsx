import React, {  useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import SocialWallPanel from "@/containers/Participant/Home/socialWall/SocialWallPanel";
import { MerchantSlider } from "./components/slider/index";
import { ParticipantTabNavs} from "@/shared/components/tabNavs";
import { connect } from "react-redux";
import { USER_STATUS_PENDING_DEACTIVATION } from "@/services/user/getUser";
import SlideOutMenu from "./components/slide-out-menu";
import Points from "../../Layout/sidebar/Points";
import { useTranslation } from "react-i18next";
// import { setMerchant } from "@/redux/actions/merchantActions";

const Home = ({ auth, program, template }) => {
    const { t } = useTranslation();
    let [showSocialWall, setShowSocialWall] = useState(null);

    const participant_homepage_message  = {__html: template?.participant_homepage_message
            ? template.participant_homepage_message : t("participant_homepage_message")}

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

    const HomeClear = () => {
        const IMG_BACK = template.hero_banner
            ? `${process.env.REACT_APP_API_STORAGE_URL}/${template.hero_banner}`
            : `${process.env.PUBLIC_URL}/theme/clear/img/back.jpg`;
        return (
            <>
                <div className="text-center mt-5 mb-5" dangerouslySetInnerHTML={participant_homepage_message}></div>
                <div className="mainboard">
                    <div className="homeImgWrap">
                        <img src={IMG_BACK} alt="home_Img" />
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
                    <MerchantSlider />
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
                <div className="text-center mt-5 mb-5" dangerouslySetInnerHTML={participant_homepage_message}></div>
                <div className={"mainboard d-flex"}>
                    <SlideOutMenu isFixed={true} />
                    <div className="homeImgWrap">
                        <img src={IMG_BACK} alt="home_mg"/>
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
                                    <MerchantSlider />
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
        template: state.template,
    };
};
export default connect(mapStateToProps)(Home);