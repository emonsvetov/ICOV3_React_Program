import React, { useEffect, useState } from "react";
import { Col, Container, FormGroup, Row } from "reactstrap";
import { SidebarOrigin } from "../../Layout/sidebar";
import Select from "react-select";
import TemplateButton from "@/shared/components/TemplateButton";

const IMG_GLOBAL = `${process.env.PUBLIC_URL}/img/global_merchants_image.jpg`;

const GLOBAL_MERCHANTS = [
  {
    label: "Australia",
    value:
      "https://www.awardhdqtrs.net/AwardsNetDev/Mobile/SecurityQuestions.aspx",
  },
  {
    label: "Canada",
    value:
      "https://www.awardhdqtrs.net/AwardsNetDev/Mobile/SecurityQuestions.aspx",
  },
  {
    label: "United States",
    value:
      "https://www.awardhdqtrs.net/AwardsNetDev/Mobile/SecurityQuestions.aspx",
  },
];

export const GlobalMerchants = () => {
  // let navigate = useNavigate();

  const [merchant, setMerchant] = useState("");
  const handleVisit = () => {
    alert(merchant.value);
  };

  useEffect(() => {
    setMerchant(GLOBAL_MERCHANTS[0]);
  }, [GLOBAL_MERCHANTS]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <div className="space-30"></div>
        <Col md={3}>
          <SidebarOrigin props={{ title: "My Rewards", icon: "MyRewards" }} />
        </Col>
        <Col md={9} className="">
          <div className="mb-3" style={{ fontWeight: 600 }}>
            Redeem your points from this list for merchandise, travel,
            entertainment, events and more!
          </div>
          <img src={IMG_GLOBAL} width={"100%"} alt={"global"} />
          <div className="select-global-merchant">
            <Select
              options={GLOBAL_MERCHANTS}
              defaultValue={GLOBAL_MERCHANTS[0]}
              className="react-select"
              onChange={(item) => setMerchant(item)}
              classNamePrefix="react-select"
            />
            <TemplateButton type="submit" onClick={handleVisit} text="Visit" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
