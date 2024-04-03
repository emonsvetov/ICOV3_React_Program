import React from "react";
import {createMarkup} from "@/shared/helpers";
import { useTranslation } from "react-i18next";

const storageUrl = `${process.env.REACT_APP_API_STORAGE_URL}/`

export const RedemptionToPrint = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  
  return (
    <div ref={ref}>
      <div style={{padding: '15px'}}>
        <table >
          <tr>
            <td style={{width: '150px', padding: '10px'}}>
              <img style={{width: '100%'}} src={storageUrl + props.merchant?.icon} className="gift-icon" />
            </td>
            <td>
              <div><h5>{props.merchant?.name}</h5></div>
              <div><h5>${parseFloat(props.sku_value).toFixed(2)} {t('gift_code')}</h5></div>
              <div>&nbsp;</div>
              <div>{t('redeem_code_by_visiting')}:</div>
              <a style={{color: 'blue'}} href={props.merchant?.website} >{props.merchant?.website}</a>
              <div>&nbsp;</div>
              <div><b>{t('gift_code')}: </b>{props.code}</div>
              <div><b>{t('pin')}: </b>{props.pin}</div>
              <div>&nbsp;</div>
              <div>{t('redemption_instructions')}</div>
              <div className="right" dangerouslySetInnerHTML={createMarkup(props.merchant?.redemption_instruction)}/>
            </td>
          </tr>
        </table>
      </div>

      {/*<div className="print_content" style={{padding: '15px'}}>*/}
      {/*  <div style={{float: 'left', width: '10%;'}}>&nbsp;</div>*/}
      {/*    <img style={{width: '100%'}} src={storageUrl + props.merchant.icon} className="gift-icon" />*/}
      {/*  <div style={{float: 'right', width: '90%'}}>*/}
      {/*    <div className="right" dangerouslySetInnerHTML={createMarkup(props.merchant.redemption_instruction)}/>*/}
      {/*  </div>*/}
      {/*  <div>&nbsp;</div>*/}
      {/*</div>*/}
    </div>
  );
});

export default RedemptionToPrint;
