import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Button, Col, Container, Row } from "reactstrap";
import { TABLE_COLUMNS } from "./column";

import { connect } from "react-redux";

const ImportCsvTable = ({ organization, program }) => {
  const { t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadTemplate = async () => {
    setIsDownloading(true);
    // const response = await axios.get(`organization/${organization.id}/program/${program.id}/import/download-template`);
    axios.get(`organization/${organization.id}/program/${program.id}/import/download-template`,
    {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Accept': 'application/csv'
        }
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `demo.csv`); //or any other extension
        document.body.appendChild(link);
        link.click();
        setIsDownloading(false);
    })
    .catch((error) => {
      console.log(error)
      setIsDownloading(false);
    });
  };

  return (
    <>
      <Container>
        <div className="table react-table">
          <table className="table table-striped">
            <thead>
              <tr>
                {TABLE_COLUMNS.map((head) => (
                  <th key={head.accessor}>{head.Header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table table--bordered"></tbody>
            <tfoot>
              <tr>
                  <td colSpan={TABLE_COLUMNS.length} >
                    <div style={{float:"right", textAlign:'center'}}>
                      <label className="p-1 text-center">
                        Download Import Template
                      </label>
                      <br />
                      <Button className="bg-primary text-white" onClick={()=>downloadTemplate()}>Download</Button>
                      {isDownloading && <p className="text-center">{t('Downloading.. please wait..')}</p>}
                    </div>
                  </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(ImportCsvTable);
