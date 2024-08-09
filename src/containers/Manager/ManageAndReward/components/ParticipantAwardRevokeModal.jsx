import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { Link } from "react-router-dom";
import { Img } from "@/theme";
import {
  flashError,
  flashSuccess,
  useDispatch,
} from "@/shared/components/flash";
import { PENDING_AWARD_COLUMNS } from "./columns";
import AwardApprovalPopup from "../../Home/components/AwardApprovalPopup";
import { TableSkeleton } from "@/shared/components/Skeletons";

const ParticipantAwardReportModal = ({
  isOpen,
  setOpen,
  toggle,
  auth,
  participants,
  program,
  organization,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [statusName, setStatusName] = useState("");
  const [pendingCascadingApproval, setPendingCascadingApproval] = useState([]);
  const [revokeAwardApprovalId, setRevokeAwardApprovalId] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const isToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (organization?.id && program?.id && participants) setLoading(true);
    axios
      .get(
        `/organization/${organization.id}/program/${program.id}/${participants.id}/pending-approvals`
      )
      .then((res) => {
        setPendingCascadingApproval(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [program, organization, participants]);

  const tableStyled = {
    headerBottom: { borderBottom: "5px solid rgb(136, 136, 255)" },
  };

  const RenderActions = ({ row }) => {
    return (
      <span className="m-1">
        {auth?.id === row?.original.awarder_id && (
          <Link
            to=""
            onClick={() => {
              setStatusName("reject");
              setIsShow(true);
              isToggle();
              setRevokeAwardApprovalId(row.original.id);
            }}
          >
            <span className="bg-warning p-2 rounded"> Revoke</span>
          </Link>
        )}
      </span>
    );
  };

  let final_columns = [
    ...PENDING_AWARD_COLUMNS,
    ...[
      {
        Header: "Action",
        accessor: "action",
        Footer: "Action",
        Cell: ({ row }) => <RenderActions row={row} />,
      },
    ],
  ];

  const columns = React.useMemo(() => final_columns, []);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: pendingCascadingApproval,
    },
    useSortBy
  );

  const onSubmit = (values) => {
    let formData = {};
    formData.budget_cascading_approval_id = [revokeAwardApprovalId];
    formData.approved = 2;
    formData.rejection_note = values.rejection_note;
    axios
      .delete(
        `/organization/${organization.id}/program/${program.id}/budget-cascading-approval/${revokeAwardApprovalId.id}`,
        { data: formData }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toggle();
          flashSuccess(dispatch, "Award Revoke successfully!");
          window.location.reload();
        }
      })
      .catch((err) => {
        flashError(dispatch, err.message);
      });
  };

  const participantIds = pendingCascadingApproval?.map((participant) => {
    return { cascading_id: participant.id, ...participant };
  });

  return (
    <Modal
      className={`program-settings modal-2col modal-xl`}
      isOpen={isOpen}
      toggle={() => setOpen(true)}
    >
      <div className="close cursor-pointer">
        <CloseIcon onClick={toggle} size={30} />
      </div>
      <div className="left w-30">
        <div className="title mb-5">
          <h3>Award Pending Report</h3>
        </div>
        <Img src="img/pages/giveReward.png" className="manage" />
      </div>
      <div className="right">
        <div className="d-flex ">
          <span style={{ marginRight: "5px" }}>
            {" "}
            <b>
              {participants?.first_name}, {participants?.last_name}
            </b>
          </span>
          <p>has the following award Pending for Approval</p>
        </div>
        {!loading ? (
          pendingCascadingApproval && (
            <div className="mt-3">
              <Table striped borderless size="md" {...getTableProps()}>
                <thead style={{}}>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          style={tableStyled.headerBottom}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
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
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )
        ) : (
          <TableSkeleton rows={2} columns={3} width={"100%"} height={25}/>
        )}
      </div>
      <AwardApprovalPopup
        isOpen={open}
        setOpen={setIsOpen}
        toggle={isToggle}
        organization={organization}
        program={program}
        awardApprovalParticipants={participantIds}
        statusName={statusName}
        rejection_notes={"Award Revoked!"}
        isShow={isShow}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
    theme: state.theme,
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(ParticipantAwardReportModal);
