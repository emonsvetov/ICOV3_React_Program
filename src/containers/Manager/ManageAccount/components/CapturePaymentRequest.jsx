import React, { useEffect,useState } from "react";

import SuccessCreditAmount from "./CreditAmountModal";

const CapturePaymentRequest = () => {
  const [message, setStatusMessage] = useState("");
  const [isPaymentModelOpen, setPaymentModelOpen] = useState(false);
  const statusAmount = () => {
    const queryParams = new URLSearchParams(window.location.search);
    let status = queryParams.get("ccdepositStatus");

    if (status === "1" || status === "5") {
      let msg = { label: "Default Label", message: "Some message here" };
      if (status === "1") {
        msg = {
          label: "Success",
          message: "Your payment was successfully processed.",
        };
      } else if (status === "5") {
        msg = { label: "Error", message: "Your payment was failed." };
      }
      setStatusMessage(msg);
      setPaymentModelOpen(true);
    }
  };

  useEffect(() => {
    statusAmount();
  }, []);
  return (
    <SuccessCreditAmount
      message={message}
      isOpen={isPaymentModelOpen}
      setPaymentModelOpen={setPaymentModelOpen}
    />
  )
}

export default CapturePaymentRequest