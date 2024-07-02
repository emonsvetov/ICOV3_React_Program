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
import AwardScheduleDateModel from "./AwardScheduleDate";

const ACTIONS = [{ label: "reject", name: "Reject" }];

const approveOrRejectCascadingBudget = (oId, pId, participantsData, name) => {
  try {
    if (participantsData?.length > 0) {
      let formData = {};
      const participantIds = participantsData?.map(
        (participant) => participant.cascading_id
      );
      formData.budget_cascading_approval_id = participantIds;
      formData.approved = name == "Approved" ? "1" : "2";
      const response = axios.put(
        `/organization/${oId}/program/${pId}/manage-approvals`,
        formData
      );
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

const queryClient = new QueryClient();

const BudgetCascadingPendingApprovalsTable = ({ organization, program }) => {
  const [participants, setParticipants] = useState(null);
  const [filter, setFilter] = useState({ keyword: "" });
  const [loading, setLoading] = useState(true);
  const [participantsScheduleData, setParticipantsScheduleData] =
    useState(null);
  const [isOpen, setOpen] = useState(false);

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
    }
  };

  const onSelectAction = (name) => {
    const rows = selectedFlatRows.map((d) => d.original);
    if (rows.length === 0) {
      alert("Select participants");
      return;
    }

    approveOrRejectCascadingBudget(
      organization?.id,
      program?.id,
      rows,
      name
    ).then((response) => console.log(response));
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
        () => (participants ? participants?.data : []),
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
    axios
      .get(
        `/organization/${organization.id}/program/${program.id}/report/manage-approvals`
      )
      .then((items) => {
        if (mounted) {
          setParticipants(items);
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, [setLoading, setParticipants, pageIndex, queryPageSize, filter]);

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
                {item.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  const PendingCascadingApprovalTable = () => {
    return (
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
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
          <PendingCascadingApprovalTable />
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
        <AwardScheduleDateModel
          isOpen={isOpen}
          setOpen={setOpen}
          toggle={toggle}
          organization={organization}
          program={program}
          participantsScheduleData={participantsScheduleData}
        />
      </Container>
    );
};

const TableWrapper = ({ organization, program, programs }) => {
  if (!organization || !program) return "Loading...";
  return (
    <QueryClientProvider client={queryClient}>
      <BudgetCascadingPendingApprovalsTable
        organization={organization}
        program={program}
        programs={programs}
      />
    </QueryClientProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(TableWrapper);
