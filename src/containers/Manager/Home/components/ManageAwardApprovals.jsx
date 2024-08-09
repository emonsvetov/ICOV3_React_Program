import React, { useEffect, useMemo, useState } from "react";
import {
  useExpanded,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
  useRowSelect,
} from "react-table";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Container,
} from "reactstrap";
import {
  flashError,
  flashSuccess,
  useDispatch,
} from "@/shared/components/flash";
import axios from "axios";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import { TABLE_COLUMNS } from "./Column";
import { connect } from "react-redux";
import apiTableService from "@/services/apiTableService";
import IndeterminateCheckbox from "@/shared/components/form/IndeterminateCheckbox";
import AwardScheduleDateModel from "./AwardScheduleDateModel";
import AwardApprovalPopup from "./AwardApprovalPopup";
import {
  TableSkeleton,
  ButtonSkeleton,
} from "@/shared/components/Skeletons";

const ACTIONS = [{ label: "Reject", name: "reject" }];
const queryPageSize = 10;

const ManageAwardApprovalsTable = ({
  auth,
  organization,
  program,
  togglePan,
}) => {
  const [participants, setParticipants] = useState(null);
  const [filter, setFilter] = useState({ keyword: "" });
  const [loading, setLoading] = useState(true);
  const [statusName, setStatusName] = useState("");
  const [participantsScheduleDateData, setParticipantsScheduleData] =
    useState(null);
  const [isOpen, setOpen] = useState(false);
  const [awardApprovalParticipants, setAwardApprovalParticipants] = useState(
    []
  );
  const [modelName, setModelName] = useState("");

  const dispatch = useDispatch();

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const SELECTION_COLUMN = {
    id: "selection",
    Header: ({ getToggleAllPageRowsSelectedProps }) => (
      <div>
        <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
      </div>
    ),
    Cell: ({ row }) => (
      <div>
        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      </div>
    ),
  };

  const manage_columns = [...[SELECTION_COLUMN, ...TABLE_COLUMNS]];

  const columns = React.useMemo(
    () =>
      manage_columns.map((column) => {
        if (column.accessor === "scheduled_date") {
          return {
            ...column,
            Cell: ({ value, row }) => {
              let date = new Date(value).toLocaleDateString("en-US", {});
              return (
                <div className="d-flex gap-1">
                  <span>{date}</span>
                  <span
                    className="link"
                    style={{ color: "#0d6efd", textDecoration: "underline" }}
                    onClick={() => handleEdit(row.original)}
                  >
                    Edit
                  </span>
                </div>
              );
            },
          };
        }
        return column;
      }),
    []
  );

  const handleEdit = (row) => {
    if (row) {
      setParticipantsScheduleData(row);
      toggle();
      setModelName("Award Schedule Date");
    }
  };

  const onSelectAction = (name) => {
    const rows = selectedFlatRows.map((d) => d.original);
    if (rows.length === 0) {
      alert("Select participants");
      return;
    }
    setAwardApprovalParticipants(rows);
    setStatusName(name);
    setModelName("Award Approval Popup");
    toggle();
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    pageCount,
    pageOptions,
    gotoPage,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns: columns,
      data: useMemo(
        () => (participants ? participants?.results : []),
        [participants]
      ),
      initialState: {
        pageIndex: 0,
        pageSize: queryPageSize,
      },
      manualPagination: true, // Tell the usePagination
      pageCount: Math.ceil(participants?.count / queryPageSize),
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
      disableResizing: true,
      autoResetHiddenColumns: false,
      striped: true,
    },
    useSortBy,
    useExpanded,
    usePagination,
    useResizeColumns,
    useRowSelect
  );

  const manualPageSize = [];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (organization?.id && program?.id) {
      apiTableService
        .fetchData({
          url: `/organization/${organization.id}/program/${program.id}/report/manage-approvals`,
          page: pageIndex,
          size: queryPageSize,
        })
        .then((items) => {
          if (mounted) {
            setParticipants(items);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => (mounted = false);
  }, [organization, program, togglePan, pageIndex, queryPageSize, filter]);

  const ActionsDropdown = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle caret className="dropdowntoggle">
          Actions
        </DropdownToggle>
        <DropdownMenu>
          {ACTIONS.map((item, index) => {
            return (
              <DropdownItem
                key={`action-dropdown-item-${index}`}
                onClick={() => onSelectAction(item.name)}
              >
                {item.label}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const onSubmit = (values) => {
    try {
      if (awardApprovalParticipants?.length > 0) {
        let formData = {};
        formData.budget_cascading_approval_id = awardApprovalParticipants?.map(
          (approvalParticipant) => approvalParticipant.cascading_id
        );
        formData.approved = 2;
        formData.rejection_note = values.rejection_note;

        axios
          .put(
            `/organization/${organization?.id}/program/${program?.id}/budget-cascading-approval`,
            formData
          )
          .then((response) => {
            if (response.status === 200) {
              flashSuccess(
                dispatch,
                "Award Approval status updated successfully!"
              );
              toggle();
              window.location.reload();
            }
          })
          .catch((error) => {
            flashError(dispatch, error.message);
          });
      }
    } catch (error) {
      flashError(dispatch, error.message);
    }
  };

  if (loading) {
    return (
      <>
        <ButtonSkeleton variant="rounded" width={100} height={40} />
        <TableSkeleton rows={3} columns={7} width={"100%"} height={20} />
      </>
    );
  }

  if (participants)
    return (
      <Container>
        <div className="users">
          <div className="header d-flex  justify-content-between">
            <div className="d-flex w-30 justify-content-between dropdown-group">
              <ActionsDropdown />
            </div>
          </div>
          <div className="points-summary-table">
            <Table striped borderless size="md" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
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
        </div>

        <div>
          {rows.length > 0 && (
            <>
              <ReactTablePagination
                page={page}
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageOptions={pageOptions}
                pageSize={pageSize}
                pageIndex={pageIndex}
                pageCount={pageCount}
                setPageSize={setPageSize}
                manualPageSize={manualPageSize}
                dataLength={participants ? participants.count : 0}
              />
            </>
          )}
        </div>
        {participantsScheduleDateData && (
          <AwardScheduleDateModel
            isOpen={isOpen}
            setOpen={setOpen}
            toggle={toggle}
            organization={organization}
            program={program}
            participantsScheduleDateData={participantsScheduleDateData}
            togglePan={togglePan}
            loading={loading}
          />
        )}
        {modelName === "Award Approval Popup" && awardApprovalParticipants && (
          <AwardApprovalPopup
            isOpen={isOpen}
            setOpen={setOpen}
            toggle={toggle}
            organization={organization}
            program={program}
            statusName={statusName}
            awardApprovalParticipants={awardApprovalParticipants}
            rejection_notes={`User Rejected by ${auth?.name}`}
            onSubmit={onSubmit}
          />
        )}
      </Container>
    );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    organization: state.organization,
    program: state.program,
  };
};
export default connect(mapStateToProps)(ManageAwardApprovalsTable);
