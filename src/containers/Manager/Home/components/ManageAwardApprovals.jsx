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
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import { TABLE_COLUMNS } from "./Column";
import { connect } from "react-redux";
import apiTableService from "@/services/apiTableService";
import {
  reducer,
  useEffectToDispatch,
  fetchApiData,
  initialState,
  Sorting,
} from "@/shared/apiTableHelper";
import axios from "axios";
import IndeterminateCheckbox from "@/shared/components/form/IndeterminateCheckbox";
import AwardScheduleDateModel from "./AwardScheduleDateModel";
import AwardApprovalPopup from "./AwardApprovalPopup";

const ACTIONS = [{ label: "Reject", name: "reject" }];

const queryClient = new QueryClient();

const ManageCascadingPendingApprovalsTable = ({
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

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const [
    {
      queryPageIndex,
      queryPageSize,
      totalCount,
      queryPageFilter,
      queryPageSortBy,
      queryTrigger,
    },
    dispatch,
  ] = React.useReducer(reducer, initialState);

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

  const totalPageCount = Math.ceil(totalCount / queryPageSize);

  useEffect(() => {
    setFilter({ keyword: filter.keyword });
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    rowSpanHeaders,
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
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
        sortBy: queryPageSortBy,
      },
      manualPagination: true, // Tell the usePagination
      pageCount: participants ? totalPageCount : null,
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
  useEffectToDispatch(dispatch, {
    pageIndex,
    pageSize,
    gotoPage,
    sortBy,
    participants,
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiTableService
      .fetchData({
        url: `/organization/${organization.id}/program/${program.id}/report/manage-approvals`,
        page: pageIndex,
        size: queryPageSize,
        filter,
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

  if (loading) {
    return <p>Loading...</p>;
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
                dataLength={totalCount}
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
          />
        )}
      </Container>
    );
};

const TableWrapper = ({ auth, organization, program, programs, togglePan }) => {
  if (!organization || !program) return "Loading...";
  return (
    <QueryClientProvider client={queryClient}>
      <ManageCascadingPendingApprovalsTable
        auth={auth}
        organization={organization}
        program={program}
        programs={programs}
        togglePan={togglePan}
      />
    </QueryClientProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    organization: state.organization,
    program: state.program,
  };
};
export default connect(mapStateToProps)(TableWrapper);
