import React, { useEffect,useState } from "react";

import {settleCcdeposit} from '@/services/program/transferMonies'
import DepositPaymentResponseModal from "./DepositPaymentResponseModal";

let STATUSES = {
  default: { 
    label:  "Message Box", 
    message: "You have this message",
    className: ''
  },
  expired: {
    label: 'Expired',
    message: "Invalid or expired request.",
    className: 'authresp-expired'
  },
  processed: {
    label: 'Success',
    message: "Your payment was successfully processed.",
    className: 'authresp-processed'
  },
  error: {
    label: 'Error',
    message: "Your payment was canceled or failed.",
    className: 'authresp-error'
  },
  already_paid: {
    label: 'Already Paid',
    message: "This invoice has already been paid.",
    className: 'authresp-already'
  }
}

const CapturePaymentRequest = () => {
  const [statusCode, setStatusCode] = useState("default");
  const [isOpen, setOpen] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  let status = queryParams.get("ccdepositStatus");

  const statusAmount = (status) => {
    if ( status === 1 || status === 5 ) {
      if ( status === 1 ) {
        const ccdepositHash = localStorage.getItem('ccdepositHash')
        if( !ccdepositHash ) {
          setStatusCode("expired")
        } else {
          try {
              let dpHash = JSON.parse(ccdepositHash);
              // console.log(dpHash)
              const data = {amount: dpHash.amount, hash: dpHash.hash}
              settleCcdeposit(dpHash.orgId, dpHash.pId, data )
              .then( resp => {
                // console.log(resp)
                if( resp?.txt && resp?.status )  {
                  // console.log(resp.status)
                  STATUSES[resp.status]["message"] = resp.txt
                  // console.log(STATUSES[resp.status]["message"])
                }
                if( resp?.status ) {
                    setStatusCode(resp.status)
                } else {
                  setStatusCode('error')
                }
                localStorage.removeItem('ccdepositHash');
              })
          } catch (e) {
              console.error(e); // error
          }
        }
      } else if ( status === 5 ) {
        setStatusCode("error")
      }
      setOpen(true);
    }
  };

  useEffect(() => {
    if( status !== "" )  {
      statusAmount(parseInt(status));
    }
  }, [status]);

  return (
    <DepositPaymentResponseModal
      message={STATUSES[statusCode]}
      isOpen={isOpen}
      setOpen={setOpen}
    />
  )
}

export default CapturePaymentRequest