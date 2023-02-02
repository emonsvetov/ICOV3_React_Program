import React from "react";
import {createMarkup} from "@/shared/helper";

const storageUrl = `${process.env.REACT_APP_API_STORAGE_URL}/`

export const RedemptionToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div className="print_content">
        <div>&nbsp;</div>
        <img vspace="15" hspace="15" width="100" src={storageUrl + props.merchant.icon} className="gift-icon"></img>
        <div>&nbsp;</div>
        <div className="right" dangerouslySetInnerHTML={createMarkup(props.merchant.redemption_instruction)}/>
        <div>&nbsp;</div>
      </div>
    </div>
  );
});

export default RedemptionToPrint;
