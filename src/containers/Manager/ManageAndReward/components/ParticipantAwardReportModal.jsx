import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import CloseIcon from "mdi-react/CloseIcon";
import { useTranslation } from "react-i18next";
import { flashDispatch, flashMessage } from "@/shared/helpers";
import { Table } from "reactstrap";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { Link } from "react-router-dom";
import { Img } from "@/theme";
import TemplateButton from "@/shared/components/TemplateButton";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";
import { PENDING_AWARD_COLUMNS } from "./columns";

const ParticipantAwardReportModal = ({
  isOpen,
  setOpen,
  toggle,
  participants,
  program,
  organization,
}) => {
  const dispatch = flashDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [participantName, setParticipantName] = useState("");
  console.log(participants);
  //   useEffect(()=>{
  //     if (participants) {
  //         participants
  //     }
  //   },[participants])

  useEffect(() => {
    setLoading(true);
    if (!organization?.id || !program?.id) return;
    let mounted = true;
    return () => (mounted = false);
  }, []);

  //if (loading) return t("loading");

  const onSubmit = (values) => {
    axios
      .post(
        `/organization/${organization.id}/program/${program.id}/create-user-goals`
      )
      .then((res) => {
        //console.log(res)
        if (res.status === 200) {
          toggle();
          //let msg = "User Goal Plan created successfully!"
          let msg = "";
          if (res.data.message) {
            msg += " " + res.data.message;
          }
          dispatch(flashMessage(msg));

          window.location.reload();
        }
      })
      .catch((err) => {
        dispatch(
          flashMessage(
            <ApiErrorMessage errors={err.response.data} />,
            "alert-danger",
            "top"
          )
        );
      });
  };

  const tableStyled = {
    headerBottom: { borderBottom: "5px solid rgb(136, 136, 255)" },
  };

  const RenderActions = ({ row }) => {
    console.log(row);
    return (
      <span className="m-1">
        <Link
          to=""
          // onClick={() => console.log(row)}
        >
          <span className="bg-warning p-2 rounded"> Revoke</span>
        </Link>
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
      data: participants,
    },
    useSortBy
  );

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
        <div className="mt-3">
          <Table striped borderless size="md" {...getTableProps()}>
            <thead style={{}}>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    template: state.template,
    theme: state.theme,
  };
};
export default connect(mapStateToProps)(ParticipantAwardReportModal);
