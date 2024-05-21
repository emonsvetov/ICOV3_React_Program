import React, { useState } from "react";
import { connect } from "react-redux";

import { Col, Container, Row } from "reactstrap";

import TemplateButton from "@/shared/components/TemplateButton";
import {Img} from '@/theme'

const ReferralTools = ({ auth, program, organization }) => {
  // console.log(auth)
  const ReferralWidgetImg = `img/pages/Referrals_Image.png`;
  const FEWidgetImg = `img/pages/FE_Widget.png`;
  const LinkedinIcon = `img/pages/linkedin_icon.png`;
  const TwitterIcon = `img/pages/twitter_icon.png`;
  const YoutubeIcon = `img/pages/youtube_icon.png`;

  if (!auth || !program || !organization) return "loading";

  return (
    <div className="referral_tools">
      <Container>
        <div className="mt-4 d-flex justify-content-between">
            <div class="referrals-info-col-left scale-down-target-70">
                <div class="referrals-info-1">Fasteezy Widget</div>
                <div class="referrals-info-2">
                    Getting referrals, new leads, and positive feedback has never been easier. The 5 tools below can be quickly and easily added to your website, emails, social media feeds, print, and more to request referrals, encourage feedback, and attract new leads.
                </div>
            </div>
            <div class="referrals-info-col-right scale-down-target-70">
              <Img src={ReferralWidgetImg} className="referral_widget" />
            </div>
        </div>
        <ul className="referral-list scale-down-target-70">
            <li className="referral-list-li li-1">
              <div className="number-circle">1</div>
              <div className="referral-list-item">    
                <div className="referral-inner-li">
                  <div className="referral-column">
                      <div className="referral-label">Create an email with your referral widget link</div>
                      <div className="referral-text">Click "create" to generate an email <br />with your unique referral link ready to use.<br />Click the widget icon to copy, allowing<br />you to paste it in your communications:</div>
                  </div>
                  <div className="referral-column">
                      <div className="referral-resource" style={{textAlign: 'center'}}>
                        <Img src={FEWidgetImg} className="iframe" style={{marginRight:'10%', width:'175px', height:'95px'}} />
                      </div>
                      <div className="referral-resource" style={{textAlign: 'center'}}></div>
                  </div>
                  <div className="referral-column referral-button-column d-flex align-items-center">                          
                    <a className="referral-copy" id="create-email" href="#" style={{verticalAlign: "middle"}}>Create</a>
                  </div>
                  <div className="referral-column">
                      <div className="youtube-icon d-flex align-items-center justify-content-center tooltip" onClick="openVideoModal('https://youtube.com/embed/UvsNkg0JwAc?rel=0')" tooltip="Click here to for a tutorial">
                          <Img src={YoutubeIcon} className="iframe" alt="youtube icon"/>
                      </div>
                  </div>
                </div>
              </div>
            </li>
        </ul>
      </Container>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(ReferralTools);
