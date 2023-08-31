import React, {useState, useRef, useEffect} from "react";
import PrinterIcon from "mdi-react/PrinterIcon";
import {useTranslation} from "react-i18next";
import RedemptionInstructionsModalWrapper from "./RedemptionInstructionsModalWrapper";
import { RedemptionToPrint } from './RedemptionToPrint';
import { useReactToPrint } from 'react-to-print';
import {getBalance} from "@/services/program/getBalance";


const storageUrl = `${process.env.REACT_APP_API_STORAGE_URL}/`

const GiftCardOriginal = (props) => {
  const {t} = useTranslation();
  const {merchant, redemption_date, code, pin, sku_value, virtual_inventory, tango_reference_order_id,
    tango_request_id} = props.data;

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

  const showCode = !virtual_inventory || tango_reference_order_id ? true : false;

  return (
    <div className="panel gift-card d-flex mb-5 rounded-3">
      <div className="gift-icon-wrapper">
        <img src={storageUrl + merchant?.icon} className="gift-icon" alt="gift-icon"></img>
      </div>
      <div className="gift-info d-flex flex-column justify-content-evenly pr-2">
        <div className="d-flex justify-content-between">
          <h5>{merchant?.name}</h5>
          <span>
            <div>
              {redemption_date && showCode ? t("received")+':'+redemption_date_formated : ''}
            </div>
            <div>
              { showCode ? parseFloat(sku_value).toFixed(2) : <div>&nbsp;</div> }
            </div>
          </span>
          { showCode ? <PrinterIcon onClick={handlePrint} className="printIcon" size={20}/> : '' }
        </div>
        {showCode ? (
          <div>
            <div className="gift-code">
              <strong>
                {t("gift_code")} #:{code}
              </strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>
                {t("pin")}:{ pin }
              </span>
              <a onClick={redemptionEvent} className="redemption_link">
                  {t("redemption_instructions")}
                </a>
            </div>
          </div>
        ): (
            <div className="gift-code">
              <strong>Your redemption is on its way! Your code will be delivered to you momentarily</strong>
            </div>
        )}
      </div>
      <div style={{ display: "none" }}><RedemptionToPrint ref={componentRef} merchant={merchant} sku_value={sku_value}
                                                          code={code} pin={pin}/></div>
      <RedemptionInstructionsModalWrapper
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={popupToggle}
        merchant={merchant}
      />
    </div>
  );
};

export default GiftCardOriginal;
