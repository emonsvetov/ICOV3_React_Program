import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Container, FormGroup, Input, Label, Navbar, NavbarBrand, Row } from "reactstrap";
import Select from "react-select";
import TemplateButton from "@/shared/components/TemplateButton";
import { useParams } from "react-router-dom";
import { flash422, flashSuccess } from "@/shared/components/flash";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { MerchantSlider } from "@/containers/Participant/Home/components/slider";
import ReferralSubmission from "./components/ReferralSubmission";

const RefParticipants = ({ template, program }) => {
  // console.log(auth)
  let params = useParams();
  const { programId } = params;

  if (!template) return "loading";
  const Brand = `${process.env.REACT_APP_API_STORAGE_URL}/${template.small_logo}`;

  return (
    <div className="ref-participants">
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
