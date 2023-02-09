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
import { getReferralNotificationRecipients } from '@/services/referral/getReferralNotificationRecipients'
import { getReferralNotificationRecipient } from '@/services/referral/getReferralNotificationRecipient'
import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"

const Referrals = ({ program, organization }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [referrals, setReferrals] = useState([]);
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [modalName, setModalName] = useState(null);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const onClickEditReferral = (referralId) => {
    getReferralNotificationRecipient(organization.id, program.id, referralId)
      .then(item => {
        setReferral(item)
        toggle('EditReferral');
        setLoading(false)
      })
  };
  const onDeleteReferral = (e, referral_id) => {
    axios.delete(
      `/organization/${program.organization_id}/program/${program.id}/referral-notification-recipient/${referral_id}`
    )
      .then((res) => {
        if (res.status == 200) {
          flashSuccess(dispatch, "Referral was deleted!");
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
        <Link to={{}} onClick={() => onClickEditReferral(row.original.id)}>
          <PencilIcon style={{ marginRight: "0.5rem" }} />
          Edit
        </Link>
        <span style={{ width: "2.5rem", display: "inline-block" }}></span>
        <Link
          to={{}}
          className="delete-column"
          onClick={(e) => {
            if (window.confirm("Are you sure to delete this Administrator?")) {
              onDeleteReferral(e, row.original.id);
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
    getReferralNotificationRecipients(organization.id, program.id)
      .then(items => {
        if (mounted) {
          setReferrals(items)
          console.log(items)
          setLoading(false)
        }
      })
    setLoading(false);
    return () => (mounted = false);
  }, []);

  const columns = React.useMemo(() => final_columns, []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: referrals,
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
        referral={referral}
        setReferral={setReferral}
      />
    </>
  );
};

export default Referrals;