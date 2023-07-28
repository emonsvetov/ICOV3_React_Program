import { Row, Col } from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";

import { downloadTransferTemplate as downloadTransferTemplateService } from "@/services/program/transferMonies";
import TransferTemplateUpload from './TransferTemplateUpload'

const MoneyTransferTemplate = ( {pId, orgId} ) => {
  // console.log(pId, orgId)
  const downloadTransferTemplate = () => {
    downloadTransferTemplateService(orgId, pId)
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transfer-template-${pId}.csv`); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
  }

  return (
    <div className="money-transfer-template-wrap">
      <p className="text-medium">You may also download a transfer template file in .csv format which you can complete and upload at a later time.<br />Note: When editing the template file, do not add or delete any columns or rows. You should only modify the values in the amounts column.</p>
      <div className="text-bold"><Row><Col md="9">3. Download transfer template.</Col><Col md="3" className="text-right"><TemplateButton disabled={false} type="button" text={"Download"} onClick={downloadTransferTemplate} /></Col></Row></div>

      <div className="text-bold"><Row><Col md="6">4. Upload completed transfer template.</Col><Col md="6" className="text-right">
      
        <TransferTemplateUpload />
        
        </Col></Row></div>
    </div>
  )
}

export default MoneyTransferTemplate;