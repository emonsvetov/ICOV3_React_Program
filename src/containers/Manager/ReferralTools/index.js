import React, { useState } from "react";
import { connect } from "react-redux";

import { Col, Container, Row } from "reactstrap";

import TemplateButton from "@/shared/components/TemplateButton";
import { Img } from '@/theme'
import VideoModal from "./components/VideoModal";

const ReferralWidgetImg = `img/pages/Referrals_Image.png`;
const FEWidgetImg = `img/pages/FE_Widget.png`;
const YoutubeIcon = `img/pages/youtube_icon.png`;
const FacebookIcon = `img/pages/facebook_icon.png`;
const LinkedinIcon = `img/pages/linkedin_icon.png`;
const TwitterIcon = `img/pages/twitter_icon.png`;

const ReferralTools = ({ auth, program, organization }) => {
  // console.log(auth)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const handleVideoClick = (id) => {
    setVideoId(id);
    setIsVideoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsVideoModalOpen(false);
  };

  if (!auth || !program || !organization) return "loading";

  return (
    <div className="referral_tools">
      <Container>
        <div className="mt-4 d-flex justify-content-between" style={{marginLeft: '8%'}}>
          <div class="referrals-info-col-left scale-down-target-70">
            <div class="referrals-info-1">Referral Widget</div>
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
                  <div className="referral-resource" style={{ textAlign: 'center' }}>
                    <Img src={FEWidgetImg} className="iframe" style={{ marginRight: '10%', width: '175px', height: '95px' }} />
                  </div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div className="referral-column referral-button-column d-flex align-items-center">
                  <TemplateButton className="referral-copy" onClick={() => { }} text="CREATE" />
                  {/* <a className="referral-copy" id="create-email" href="#" style={{verticalAlign: "middle"}}>Create</a> */}
                </div>
                <div className="referral-column">
                  <div className="youtube-icon d-flex align-items-center justify-content-center" onClick={() => handleVideoClick('UvsNkg0JwAc?rel=0')} tooltip="Click here to for a tutorial">
                    <Img src={YoutubeIcon} className="iframe" alt="youtube icon" />
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="referral-list-li li-2">
            <div class="number-circle">2</div>
            <div class="referral-list-item">
              <div class="referral-inner-li">
                <div class="referral-column">
                  <div class="referral-label">Share your referral widget on social media</div>
                  <div class="referral-text">Click on the below social platform and create a post in seconds with the embedded widget:</div>
                </div>
                <div class="referral-column">
                  <div class="referral-resource" style={{ textAlign: 'center' }}>
                    <Img src={FEWidgetImg} className="iframe" style={{ marginRight: '10%', width: '175px', height: '95px' }} />
                    {/* <img class="iframe" src="/assets/theme/fasteezy/img/new/FE_Widget_175x80.png" style={{ marginRight: '10%', width: '175px', height: '95px' }} onclick="copyRewardImage(this.getAttribute('data-url'))" data-url="https://fasteezy.com/assets/theme/fasteezy/img/new/FE_Widget_175x80.png" /> */}
                  </div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  <div class="referral-social-share-container">
                    <div class="referral-social-share">
                      <div id="social_share">
                        <a class="fb" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffasteezy.com%2Fref-participants%2Fprogram%2F785093" target="_blank">
                          <Img src={FacebookIcon} className="iframe" alt="facebook icon" />
                        </a>
                        <a class="li" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ffasteezy.com%2Fref-participants%2Fprogram%2F785093" target="_blank" onclick="window.open(this.href, 'LinkedIn', 'width=550,height=400'); return false;">
                          <Img src={LinkedinIcon} className="iframe" alt="linkedin icon" />
                        </a>
                        <a class="twitter" href="https://twitter.com/intent/tweet?text=https%3A%2F%2Ffasteezy.com%2Fref-participants%2Fprogram%2F785093" target="_blank">
                          <Img src={TwitterIcon} className="iframe" alt="twitter icon" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="referral-column">
                  <div class="youtube-icon flex align-center justify-center" onClick={() => handleVideoClick('8_aavaA0ULE?rel=0')} tooltip="Click here to for a tutorial">
                    <Img src={YoutubeIcon} className="iframe" alt="youtube icon" />
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="referral-list-li li-3">
            <div class="number-circle">3</div>
            <div class="referral-list-item">
              <div class="referral-inner-li">
                <div class="referral-column">
                  <div class="referral-label">Use this QR code on your printed collateral</div>
                  <div class="referral-text">Add the QR code to all your printed material to boost your referrals:</div>
                </div>
                <div class="referral-column">
                  <div class="referral-resource-icon">
                    <img id="qrimg" src="https://fasteezy.com/assets/theme/fasteezy/img/qr/785093.png" />
                  </div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  <TemplateButton className="referral-copy" onClick={() => { }} text="COPY" />
                  {/* <a class="referral-copy" id="qr-copy" href="#" style={{verticalAlign: "middle"}}>COPY</a> */}
                </div>
                <div class="referral-column">
                  <div class="youtube-icon flex align-center justify-center " onClick={() => handleVideoClick('MhkddCXTORc?rel=0')} tooltip="Click here to for a tutorial">
                    <Img src={YoutubeIcon} className="iframe" alt="youtube icon" />
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="referral-list-li li-4">
            <div class="number-circle">4</div>
            <div class="referral-list-item">
              <div class="referral-inner-li">
                <div class="referral-column">
                  <div class="referral-label">Add the referral widget to your website</div>
                  <div class="referral-text">Copy this line of code and have your web designer add it to your website:</div>
                </div>
                <div class="referral-column">
                  <div class="referral-resource-icon ">
                    {/* <img id="widgetimg" src="https://fasteezy.com/assets/theme/fasteezy/img/new/FE_Widget_175x80.png" alt="fasteezy.com" /> */}
                    <Img src={FEWidgetImg} className="iframe" style={{ marginRight: '10%', width: '175px', height: '95px' }} />
                  </div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  {/* <a class="referral-copy" id="copy" href="#" style={{verticalAlign: "middle"}}>COPY</a> */}
                  <TemplateButton className="referral-copy" onClick={() => { }} text="COPY" />
                </div>
                <div class="referral-column">
                  <div class="youtube-icon flex align-center justify-center" onClick={() => handleVideoClick('rG9Bz-f_2IE?rel=0')} tooltip="Click here to for a tutorial">
                    <Img src={YoutubeIcon} className="iframe" alt="youtube icon" />
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="referral-list-li li-5">
            <div class="number-circle">5</div>
            <div class="referral-list-item">
              <div class="referral-inner-li">
                <div class="referral-column">
                  <div class="referral-label">Copy your referral widget link</div>
                  <div class="referral-text">Copy your referral widget link to place in marketing campaigns:</div>
                </div>
                <div class="referral-column">
                  <div class="referral-resource" style={{ textAlign: 'center' }}>https://fasteezy.com/ref-participants/program/785093</div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  {/* <a class="referral-copy" id="copy-form-link" href="#" style={{verticalAlign: "middle"}}>COPY</a> */}
                  <TemplateButton className="referral-copy" onClick={() => { }} text="COPY" />
                </div>
                <div class="referral-column">
                  <div class="youtube-icon flex align-center justify-center" onClick={() => handleVideoClick('yIV3phEObxA?rel=0')} tooltip="Click here to for a tutorial">
                    <Img src={YoutubeIcon} className="iframe" alt="youtube icon" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Container>
      <VideoModal isOpen={isVideoModalOpen} onClose={handleModalClose} videoId={videoId} />

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
