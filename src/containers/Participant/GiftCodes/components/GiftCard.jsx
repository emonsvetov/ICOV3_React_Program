import React, {useRef, useState} from "react";
import PrinterIcon from "mdi-react/PrinterIcon";
import { useTranslation } from "react-i18next";
import RedemptionInstructionsModalWrapper from "./RedemptionInstructionsModalWrapper";
import { RedemptionToPrint } from './RedemptionToPrint';
import { useReactToPrint } from 'react-to-print';

const storageUrl = `${process.env.REACT_APP_API_STORAGE_URL}/`

const GiftCard = (props) => {
  const { t } = useTranslation();
  const {merchant, redemption_date, code, pin, sku_value} = props.data;

  const popupToggle = () => {
    setOpen((prevState) => !prevState);
  };
  const [isOpen, setOpen] = useState(false);

  const redemptionEvent = () => {
    setOpen((prevState) => !prevState);
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let redemption_date_formated = new Date(redemption_date).toLocaleDateString("en-US", {});

  return (
    <div className="panel gift-card d-flex mb-5 rounded-3">
      <div className="gift-icon-wrapper">
        <img src={storageUrl + merchant.icon} className="gift-icon" alt="gift-icon"></img>
      </div>
      <div className="gift-info d-flex flex-column justify-content-evenly pr-2">
        <div className="d-flex justify-content-between">
          <h5>{merchant.name}</h5>
          <span>
            <div>
              {t("received")}:{redemption_date ? redemption_date_formated : ''}
            </div>
            <div>
              ${parseFloat(sku_value).toFixed(2)}
            </div>
          </span>
          <PrinterIcon onClick={handlePrint} className="printIcon" size={20}/>
        </div>
        <div className="gift-code">
          <strong>
            {t("gift_code")} #:{code}
          </strong>
        </div>
        <div className="d-flex justify-content-between">
          <span>
            {t("pin")}:{pin}
          </span>
          <a onClick={redemptionEvent} className="redemption_link">
            {t("redemption_instructions")}
          </a>
        </div>
      </div>
      {/*<div className="gift-amount">*/}
      {/*  <div className="amount-wrapper">*/}
      {/*    <h6>${amount.toFixed(2)}</h6>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div style={{ display: "none" }}><RedemptionToPrint ref={componentRef} merchant={merchant} /></div>
      <RedemptionInstructionsModalWrapper
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={popupToggle}
        merchant={merchant}
      />
    </div>
  );
};

export default GiftCard;
