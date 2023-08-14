import { Col, Row} from "reactstrap";
import TemplateButton from "@/shared/components/TemplateButton";
import { downloadTransferTemplate as downloadTransferTemplateService } from "@/services/program/transferMonies";

const TransferTemplateDownload = ({orgId, pId}) => {

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
    <div className="text-bold"><Row><Col md="9">3. Download transfer template.</Col>
      <Col md="3" className="text-right">
    <TemplateButton disabled={false} type="button" text={"Download"} onClick={downloadTransferTemplate} />
    </Col></Row></div>
  )
}

export default TransferTemplateDownload