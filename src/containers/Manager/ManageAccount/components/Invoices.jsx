import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import PencilIcon from "mdi-react/PencilIcon";
import TrashIcon from "mdi-react/TrashCanIcon";

import { REFERRAL_COLUMNS } from "./Mockdata";
import ModalWrapper from "./ModalWrapper";
// import { getinvoiceNotificationRecipients } from '@/services/invoice/getinvoiceNotificationRecipients'
import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"

const Invoices = ({ program, organization }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState([]);
  const [invoice, setinvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const onClickEditinvoice = (invoiceId) => {
    // getinvoiceNotificationRecipient(organization.id, program.id, invoiceId)
    //   .then(item => {
    //     setinvoice(item)
    //     toggle('Editinvoice');
    //     setLoading(false)
    //   })
  };
  const onDeleteinvoice = (e, invoice_id) => {
    axios.delete(
      `/organization/${program.organization_id}/program/${program.id}/invoice-notification-recipient/${invoice_id}`
    )
      .then((res) => {
        if (res.status == 200) {
          flashSuccess(dispatch, "invoice was deleted!");
          setLoading(false);
          window.location.reload()
        }
      })
      .catch((err) => {
        flashError(dispatch, err.response.data);
        setLoading(false);
      });
  };
  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link to={{}} onClick={() => onClickEditinvoice(row.original.id)}>
          <PencilIcon style={{ marginRight: "0.5rem" }} />
          Edit
        </Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link
          to={{}}
          className="delete-column"
          onClick={(e) => {
            if (window.confirm("Are you sure to delete this Administrator?")) {
              onDeleteinvoice(e, row.original.id);
            }
          }}
        >
          <TrashIcon style={{ marginRight: "0.5rem" }} />
          Delete
        </Link>
      </span>
    );
  };

  let final_columns = [
    ...REFERRAL_COLUMNS,
    ...[
      {
        Header: "Action",
        accessor: "action",
        Footer: "Action",
        Cell: ({ row }) => <RenderActions row={row} />,
      },
    ],
  ];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // getinvoiceNotificationRecipients(organization.id, program.id)
    //   .then(items => {
    //     if (mounted) {
    //       setInvoices(items)
    //       console.log(items)
    //       setLoading(false)
    //     }
    //   })
    setLoading(false);
    return () => (mounted = false);
  }, []);

  const columns = React.useMemo(() => final_columns, []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: invoices,
  });

  if (loading) return t("loading");

  return (
    <>
      <Table striped borderless size="md" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalWrapper
        name={modalName}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
        invoice={invoice}
        setinvoice={setinvoice}
      />
    </>
  );
};

export default Invoices;