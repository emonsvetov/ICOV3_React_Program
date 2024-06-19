import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navbar, NavbarBrand } from "reactstrap";
import { useParams } from "react-router-dom";
import { MerchantSlider } from "@/containers/Participant/Home/components/slider";
import ReferralSubmission from "./components/ReferralSubmission";
import { Helmet } from 'react-helmet-async';

const sharingTitle = "Earn Valuable Rewards for Submitting Referrals, Giving Feedback or Requesting Information!";
const RefParticipants = ({ template, program }) => {
  // console.log(auth)
  useEffect(() => {
    // document.title = sharingTitle;
  }, []);
  
  let params = useParams();
  const { programId } = params;
  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;

  if (!template) return "loading";

  console.log(Brand)
  return (
    <div className="ref-participants">
      <Helmet>
        <title>{sharingTitle}</title>
        <meta name="description" content={sharingTitle} />
        <meta name="image" content={Brand} />
        <meta name="twitter:description" content={ sharingTitle } />
        <meta name="twitter:title" content={ sharingTitle } />
        <meta name="twitter:image" content={Brand}/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="og:description" content={ sharingTitle } />
        <meta name="og:title" content={ sharingTitle } />
        <meta name="og:image" content={Brand}/>
        <meta name="og:url" content={window.location.href} />
      </Helmet>
      <div className="topbar home">
        <div className="topbar__wrapper">
          <Navbar color="" expand="md" fixed="" light>
            <div className="navbar-top_row">
              <div className="navbar-brand-logowrap">
                <NavbarBrand href="/">
                  <img src={Brand} alt="Brand" />
                </NavbarBrand>
              </div>
            </div>
          </Navbar>
        </div>
      </div>
      <ReferralSubmission programId={programId}/>
      <MerchantSlider program={program} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.domain?.program,
    template: state.domain?.program?.template,
  };
};

export default connect(mapStateToProps)(RefParticipants);
