import React, { useState, useEffect } from "react";
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
const QRImg = `img/pages/qr.png`;

const ReferralTools = ({ auth, program, organization, domain }) => {
  console.log(domain)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [widgetLink, setWidgetLink] = useState("");
  const [widgetImgLink, setWidgetImgLink] = useState("");

  const handleVideoClick = (id) => {
    setVideoId(id);
    setIsVideoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsVideoModalOpen(false);
  };

  useEffect(() => {
    if (program && domain) {
      setWidgetLink(`https://${domain?.domain?.name}/manager/ref-participants/program/${program.id}`)
      setWidgetImgLink(`https://${domain?.domain?.name}/theme/clear/img/pages/FE_Widget.png`)
    }
  }, [domain, program]);

  const handleCopy = async (textToCopy) => {

    const el = document.createElement('textarea');
    el.value = textToCopy;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }

    // const URL = QRImg
    // try {
    //     const copiedImage = await fetch(URL)
    //     const blobData = await copiedImage.blob()
    //     const clipboardItemInput = new ClipboardItem({'image/png' : blobData})
    //     navigator.clipboard.write([clipboardItemInput])
    // } catch(e) {
    //     console.log(e)
    // }

    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };


  if (!auth || !program || !organization) return "loading";

  return (
    <div className="referral_tools">
      <Container>
        <div className="mt-4 d-flex justify-content-between" style={{ marginLeft: '8%' }}>
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
                  </div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  <div class="referral-social-share-container">
                    <div class="referral-social-share">
                      <div id="social_share">
                        <a class="fb" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(widgetLink)}`} target="_blank">
                          <Img src={FacebookIcon} className="iframe" alt="facebook icon" />
                        </a>
                        <a class="li" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(widgetLink)}`} target="_blank">
                          <Img src={LinkedinIcon} className="iframe" alt="linkedin icon" />
                        </a>
                        <a class="twitter" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(widgetLink)}`} target="_blank">
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
                    <Img id="qrimg" src={QRImg} />
                  </div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  <TemplateButton className="referral-copy" onClick={() => handleCopy()} text="COPY" />
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
                    <Img src={FEWidgetImg} className="iframe" style={{ marginRight: '10%', width: '175px', height: '95px' }} />
                  </div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  <TemplateButton className="referral-copy"
                    onClick={() => handleCopy(`<a href="${widgetLink}">
                      <img id="widgetimg" src="${widgetImgLink}" alt="incentco"></a>`)}
                    text="COPY"
                  />
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
                  <div class="referral-resource" style={{ textAlign: 'center' }}>{`https://${domain?.domain?.name}/manager/ref-participants/program/${program.id}`}</div>
                  <div class="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div class="referral-column referral-button-column flex align-center">
                  <TemplateButton className="referral-copy" onClick={() => handleCopy(`https://${domain?.domain?.name}/manager/ref-participants/program/${program.id}`)} text="COPY" />
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
    domain: state.domain
  };
};

export default connect(mapStateToProps)(ReferralTools);
