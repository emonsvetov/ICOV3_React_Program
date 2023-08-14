import { Row, Col } from "reactstrap";

import TransferTemplateUpload from './TransferTemplateUpload'
import TransferTemplateDownload from './TransferTemplateDownload'

const MoneyTransferTemplate = ( {pId, orgId, toggle} ) => {
  // console.log(pId, orgId)
  const props = {pId, orgId, toggle}
  return (
    <div className="money-transfer-template-wrap">
      <p className="text-medium">You may also download a transfer template file in .csv format which you can complete and upload at a later time.<br />Note: When editing the template file, do not add or delete any columns or rows. You should only modify the values in the amounts column.</p>
      <TransferTemplateDownload {...props} />
      <TransferTemplateUpload {...props}  />
    </div>
  )
}

export default MoneyTransferTemplate;