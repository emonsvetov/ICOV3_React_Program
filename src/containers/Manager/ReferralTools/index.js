import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Col, Container, Row } from "reactstrap";

import TemplateButton from "@/shared/components/TemplateButton";
import { Img } from '@/theme'
import VideoModal from "./components/VideoModal";
import QRCode from "react-qr-code";

const ReferralWidgetImg = `img/pages/Referrals_Image.png`;
const FEWidgetImg = `img/pages/FE_Widget.png`;

const ReferralTools = ({ auth, program, organization, domain }) => {
  console.log(domain)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [widgetLink, setWidgetLink] = useState("");
  const [widgetImgLink, setWidgetImgLink] = useState("");
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const qrCodeRef = useRef(null);

  const handleVideoClick = (id) => {
    setVideoId(id);
    setIsVideoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsVideoModalOpen(false);
  };

  useEffect(() => {
    if (program && domain) {
      setWidgetLink(`https://${domain?.domain?.name}/ref-participants/program/${program.id}`)
      setWidgetImgLink(`https://${domain?.domain?.name}/theme/clear/img/pages/FE_Widget.png`)
    }
  }, [domain, program]);

  const handleCreate = () => {
    const subject = encodeURIComponent(' Referrals are Appreciated and Rewarded!');
    const body = encodeURIComponent(`Hi {First Name} {Last Name},`) + '%0D%0A%0D%0A' +
    encodeURIComponent(`Click on the link below to earn valuable rewards for submitting referrals, giving feedback, or requesting information!`) + '%0D%0A' +
    encodeURIComponent(`Regards,`) + '%0D%0A' +
    encodeURIComponent(`{Your Name}`) + '%0D%0A%0D%0A' +
    encodeURIComponent(`${widgetLink}`);
    
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  const handleQRCopy = async() =>{
    const canvas = qrCodeRef.current.querySelector('canvas');
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

      const textArea = document.createElement('textarea');
      textArea.value = pngUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      window.alert("Image copied to clipboard (fallback method)!")
  }

  const handleImageCopy = async(ref) =>{
    try {
      const canvas = document.createElement('canvas');
      canvas.width = ref.current.width;
      canvas.height = ref.current.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(ref.current, 0, 0);
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png');
      });
      // Check if the Clipboard API is available
      if (navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        window.alert("Image copied to clipboard")
      } else {
        // Fallback to the old document.execCommand('copy') method
        const textArea = document.createElement('textarea');
        textArea.value = canvas.toDataURL('image/png');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        window.alert("Image copied to clipboard (fallback method)!")
      }
    } catch (err) {
      console.error('Failed to copy image to clipboard:', err);
    }
  }

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
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    window.alert("Copied to clipboard")
  };

  if (!auth || !program || !organization) return "loading";

  return (
    <div className="referral_tools mb-5">
      <Container>
        <div className="referrals-info mt-4">
          <div className="referrals-info-col-left">
            <div className="referrals-info-1">Referral Widget</div>
            <div className="referrals-info-2">
              Getting referrals, new leads, and positive feedback has never been easier. The 5 tools below can be quickly and easily added to your website, emails, social media feeds, print, and more to request referrals, encourage feedback, and attract new leads.
            </div>
          </div>
          <div className="referrals-info-col-right">
            <Img src={ReferralWidgetImg} className="referral_widget" />
          </div>
        </div>
        <ul className="referral-list">
          <li className="referral-list-li li-1">
            <div className="number-circle">1</div>
            <div className="referral-list-item">
              <div className="referral-inner-li">
                <div className="referral-column">
                  <div className="referral-label">Create an email with your referral widget link</div>
                  <div className="referral-text">Click "create" to generate an email <br />with your unique referral link ready to use.<br />Click the widget icon to copy, allowing<br />you to paste it in your communications:</div>
                </div>
                <div className="referral-column" style={{cursor: 'pointer'}}>
                  {/* <img
                      src={`${process.env.PUBLIC_URL}/theme/clear/img/pages/FE_Widget.png`}
                      className="widgetimg" style={{ display: 'none'}} 
                      ref={imgRef1}
                    /> */}
                  <div className="referral-resource" style={{ textAlign: 'center' }} onClick={() => handleImageCopy(imgRef1)}>
                    {/* <img
                      src={`${process.env.PUBLIC_URL}/theme/clear/img/pages/FE_Widget.png`}
                      className="widgetimg" style={{ marginRight: '10%', width: '175px', height: '95px' }} 
                    /> */}
                  </div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div className="referral-column referral-button-column d-flex align-items-center">
                  <TemplateButton className="referral-copy" onClick={handleCreate} text="CREATE" />
                </div>
                <div className="referral-column">
                  <div className="youtube-icon align-items-center justify-content-center" onClick={() => handleVideoClick('UvsNkg0JwAc?rel=0')} tooltip="Click here to for a tutorial">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" style={{ fill: '#FF6461' }}><path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="referral-list-li li-2">
            <div className="number-circle">2</div>
            <div className="referral-list-item">
              <div className="referral-inner-li">
                <div className="referral-column">
                  <div className="referral-label">Share your referral widget on social media</div>
                  <div className="referral-text">Click on the below social platform and create a post in seconds with the embedded widget:</div>
                </div>
                <div className="referral-column">
                  <div className="referral-resource" style={{ textAlign: 'center' }}>
                    {/* <Img src={FEWidgetImg} className="iframe" style={{ marginRight: '10%', width: '175px', height: '95px' }} /> */}
                  </div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div className="referral-column referral-button-column flex align-center">
                  <div className="referral-social-share-container">
                    <div className="referral-social-share">
                      <div className="social_share d-flex" style={{gap:'5px'}}>
                        <a className="fb" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(widgetLink)}`} target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32"><path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path></svg>
                        </a>
                        <a className="li" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(widgetLink)}`} target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32"><path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"></path></svg>
                        </a>
                        <a className="twitter" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(widgetLink)}`} target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32"><path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="referral-column">
                  <div className="youtube-icon flex align-center justify-center" onClick={() => handleVideoClick('8_aavaA0ULE?rel=0')} tooltip="Click here to for a tutorial">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" style={{ fill: '#FF6461' }}><path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="referral-list-li li-3">
            <div className="number-circle">3</div>
            <div className="referral-list-item">
              <div className="referral-inner-li">
                <div className="referral-column">
                  <div className="referral-label">Use this QR code on your printed collateral</div>
                  <div className="referral-text">Add the QR code to all your printed material to boost your referrals:</div>
                </div>
                <div className="referral-column">
                  <div className="referral-resource-icon">
                    <QRCode value="https://www.example.com" ref={qrCodeRef} size={128} style={{ margin: '10px' }} />
                  </div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div className="referral-column referral-button-column flex align-center">
                  {/* <TemplateButton className="referral-copy" onClick={handleQRCopy} text="COPY" /> */}
                </div>
                <div className="referral-column">
                  <div className="youtube-icon flex align-center justify-center " onClick={() => handleVideoClick('MhkddCXTORc?rel=0')} tooltip="Click here to for a tutorial">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" style={{ fill: '#FF6461' }}><path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="referral-list-li li-4">
            <div className="number-circle">4</div>
            <div className="referral-list-item">
              <div className="referral-inner-li">
                <div className="referral-column">
                  <div className="referral-label">Add the referral widget to your website</div>
                  <div className="referral-text">Copy this line of code and have your web designer add it to your website:</div>
                </div>
                <div className="referral-column">
                  <div className="referral-resource-icon ">
                    {/* <Img src={FEWidgetImg} className="iframe" style={{ marginRight: '10%', width: '175px', height: '95px' }} /> */}
                  </div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div className="referral-column referral-button-column flex align-center">
                  <TemplateButton className="referral-copy"
                    onClick={() => handleCopy(`<a href="${widgetLink}">
                      <img id="widgetimg" src="${widgetImgLink}" alt="incentco"></a>`)}
                    text="COPY"
                  />
                </div>
                <div className="referral-column">
                  <div className="youtube-icon flex align-center justify-center" onClick={() => handleVideoClick('rG9Bz-f_2IE?rel=0')} tooltip="Click here to for a tutorial">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" style={{ fill: '#FF6461' }}><path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="referral-list-li li-5">
            <div className="number-circle">5</div>
            <div className="referral-list-item">
              <div className="referral-inner-li">
                <div className="referral-column">
                  <div className="referral-label">Copy your referral widget link</div>
                  <div className="referral-text">Copy your referral widget link to place in marketing campaigns:</div>
                </div>
                <div className="referral-column">
                  <div className="referral-resource" style={{ textAlign: 'center' }}>{`https://${domain?.domain?.name}/ref-participants/program/${program.id}`}</div>
                  <div className="referral-resource" style={{ textAlign: 'center' }}></div>
                </div>
                <div className="referral-column referral-button-column flex align-center">
                  <TemplateButton className="referral-copy" onClick={() => handleCopy(`https://${domain?.domain?.name}/ref-participants/program/${program.id}`)} text="COPY" />
                </div>
                <div className="referral-column">
                  <div className="youtube-icon flex align-center justify-center" onClick={() => handleVideoClick('yIV3phEObxA?rel=0')} tooltip="Click here to for a tutorial">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" style={{ fill: '#FF6461' }}><path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path></svg>
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
