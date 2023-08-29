import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { SliderClear, getMerchantLogos } from "../Home/components/slider";
import Redeem from "./components/Redeem";
import { useTranslation } from "react-i18next";
import {Themed} from '@/theme'

export const RedeemMerchant = ({ theme }) => {

  let params = useParams();
  let { merchantId } = params;
  let slide_imgs = getMerchantLogos();

  return <Themed component={'RedeemMerchant'} />

  // return (
  //   (theme?.name === "clear" && <OriginRedeemMerchant />) ||
  //   (theme?.name === "classic" && <NewRedeemMerchant />)
  // );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(RedeemMerchant);
