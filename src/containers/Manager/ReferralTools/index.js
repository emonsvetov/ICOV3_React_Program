import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Col, Container, Row } from "reactstrap";

import TemplateButton from "@/shared/components/TemplateButton";
import VideoModal from "./components/VideoModal";
import QRCode from "react-qr-code";
import Referral from "../Referral";

const ReferralTools = ({ auth, program, organization, domain, template }) => {
  console.log(domain)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [widgetLink, setCurrentWidgetLink] = useState("");
  const [widgetImgLink, setCurrentWidgetImgLink] = useState("");
  const [currentWidget, setCurrentWidget] = useState(null);
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
      setCurrentWidgetLink(`https://${domain?.domain?.name}/ref-participants/program/${program.id}`)
      setCurrentWidgetImgLink(`https://${domain?.domain?.name}/theme/clear/img/pages/FE_Widget.png`)
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
    <>
    <div className="referral_tools">
      <Container>
        <Row className="mb-5">
          <Col lg={9} md={12}>
            <h4>Referral Widget</h4>
            <p> Getting referrals, new leads, and positive feedback has never been easier. The 4 tools below can be quickly and easily added to your website, emails, social media feeds, print, and more to request referrals, encourage feedback, and attract new leads.</p>
          </Col>
        </Row>
        <Row className="pb-5">
          <Col>
            <h3 className="mb-3">Select a Share Method:</h3>
            <Row className="share-widgets gy-0 gy-md-3">
              <Col lg={3} md={4}>
                <a className="card-shadow singleWidget d-flex flex-column align-items-center p-1 p-md-4 justify-content-center gap-2" style={{border: currentWidget == 'link'? `1px solid ${template?.button_bg_color}`:""}} onClick={()=> setCurrentWidget('link')}>
                  <h4>Widget Link</h4>
                  <svg viewBox="0 0 448 512" fill={currentWidget == 'link'? `${template?.button_bg_color}`:""}><path d="M364.2 83.8C339.8 59.39 300.2 59.39 275.8 83.8L91.8 267.8C49.71 309.9 49.71 378.1 91.8 420.2C133.9 462.3 202.1 462.3 244.2 420.2L396.2 268.2C407.1 257.3 424.9 257.3 435.8 268.2C446.7 279.1 446.7 296.9 435.8 307.8L283.8 459.8C219.8 523.8 116.2 523.8 52.2 459.8C-11.75 395.8-11.75 292.2 52.2 228.2L236.2 44.2C282.5-2.08 357.5-2.08 403.8 44.2C450.1 90.48 450.1 165.5 403.8 211.8L227.8 387.8C199.2 416.4 152.8 416.4 124.2 387.8C95.59 359.2 95.59 312.8 124.2 284.2L268.2 140.2C279.1 129.3 296.9 129.3 307.8 140.2C318.7 151.1 318.7 168.9 307.8 179.8L163.8 323.8C157.1 330.5 157.1 341.5 163.8 348.2C170.5 354.9 181.5 354.9 188.2 348.2L364.2 172.2C388.6 147.8 388.6 108.2 364.2 83.8V83.8z"></path></svg>
                </a>
              </Col>
              <Col lg={3} md={4}>
                <a className="card-shadow singleWidget social-media d-flex flex-column align-items-center p-1 p-md-4 justify-content-center gap-2" style={{border: currentWidget == 'social'? `1px solid ${template?.button_bg_color}`:""}} onClick={()=> setCurrentWidget('social')}>
                  <h4>Social Media</h4>
                  <div className="d-flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill={currentWidget == 'social'? `${template?.button_bg_color}`:""} viewBox="0 0 32 32"><path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={currentWidget == 'social'? `${template?.button_bg_color}`:""} viewBox="0 0 32 32"><path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={currentWidget == 'social'? `${template?.button_bg_color}`:""} viewBox="0 0 32 32"><path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path></svg>
                  </div>
                </a>
              </Col>
              <Col lg={3} md={4}>
                <a className="card-shadow singleWidget d-flex flex-column align-items-center p-1 p-md-4 justify-content-center gap-2" style={{border: currentWidget == 'qr'? `1px solid ${template?.button_bg_color}`:""}} onClick={()=> setCurrentWidget('qr')}>
                  <h4>QR Code</h4>
                  <QRCode value={`https://${domain?.domain?.name}/ref-participants/program/${program.id}`} fgColor={currentWidget == 'qr'? `${template?.button_bg_color}`:""} ref={qrCodeRef} size={64} />
                </a>
              </Col>
              <Col lg={3} md={4}>
                <a className="card-shadow singleWidget d-flex flex-column align-items-center p-1 p-md-4 justify-content-center gap-2" style={{border: currentWidget == 'html'? `1px solid ${template?.button_bg_color}`:""}} onClick={()=> setCurrentWidget('html')}>
                  <h4>Widget HTML</h4>
                  <svg viewBox="0 0 640 512" fill={currentWidget == 'html'? `${template?.button_bg_color}`:""}><path d="M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z"></path></svg>
                </a>
              </Col>
            </Row>
            {currentWidget == "link" && <Row className="mt-5">
              <Col md={5} className="mx-auto">
                <div className="card-shadow border-0 card">
                  <div className="text-center border-0 card-header fs-5" style={{background:template?.button_bg_color, color:template?.button_color}}>Widget Link</div>
                  <div className="d-flex flex-column align-items-center gap-3 card-body">
                    <p className="m-0 bold">
                      Copy your Fasteezy widget link to place in marketing campaigns.</p>
                      <a href={`https://${domain?.domain?.name}/ref-participants/program/${program.id}`} target="_blank">
                        {`https://${domain?.domain?.name}/ref-participants/program/${program.id}`}
                      </a>
                      <TemplateButton onClick={() => handleCopy(`https://${domain?.domain?.name}/ref-participants/program/${program.id}`)} text="Copy" />
                  </div>
                </div>
              </Col>
            </Row>}
            {currentWidget == "social" && <Row className="mt-5">
              <Col md={5} className="mx-auto">
                <div className="card-shadow border-0 card">
                  <div className="text-center border-0 card-header fs-5" style={{background:template?.button_bg_color, color:template?.button_color}}>Share your referral widget on social media</div>
                  <div className="d-flex flex-column align-items-center gap-3 card-body">
                    <p className="m-0">
                      Click on the below social platform and create a post in seconds with the embedded widget.</p>
                    <div className="d-flex gap-3">
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
              </Col>
            </Row>}
            {currentWidget == "qr" && <Row className="mt-5">
              <Col md={5} className="mx-auto">
                <div className="card-shadow border-0 card">
                  <div className="text-center border-0 card-header fs-5" style={{background:template?.button_bg_color, color:template?.button_color}}>Share your referral widget on social media</div>
                  <div className="d-flex flex-column align-items-center gap-3 card-body">
                    <p className="m-0">
                      Add the QR code to all your printed material to boost your referrals.</p>
                    <QRCode value={`https://${domain?.domain?.name}/ref-participants/program/${program.id}`} ref={qrCodeRef} size={128} style={{ margin: '10px' }} />
                      {/* <TemplateButton onClick={() =>{}} text="Copy" /> */}
                  </div>
                </div>
              </Col>
            </Row>}
            {currentWidget == "html" && <Row className="mt-5">
              <Col md={5} className="mx-auto">
                <div className="card-shadow border-0 card">
                  <div className="text-center border-0 card-header fs-5" style={{background:template?.button_bg_color, color:template?.button_color}}>Add the referral widget to your website</div>
                  <div className="d-flex flex-column align-items-center gap-3 card-body">
                    <p className="m-0">
                      Copy this line of code and have your web designer add it to your website.</p>
                    <span>{`<a href="https://${domain?.domain?.name}/ref-participants/program/${program.id}"></a>`}</span>
                      <TemplateButton onClick={() => handleCopy(`<a href="https://${domain?.domain?.name}/ref-participants/program/${program.id}"></a>`)} text="Copy" />
                  </div>
                </div>
              </Col>
            </Row>}
          </Col>
        </Row>
      </Container>
      <VideoModal isOpen={isVideoModalOpen} onClose={handleModalClose} videoId={videoId} />
    </div>
    <Referral />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
    domain: state.domain,
    template: state.domain?.program?.template,
  };
};

export default connect(mapStateToProps)(ReferralTools);
