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
  Dropdown,
  Container,
} from "reactstrap";
import TableFilter from "@/shared/components/table/components/TableFilter";
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
import RewardIcon from "mdi-react/PostItNoteAddIcon";
import DeactivateIcon from "mdi-react/CancelIcon";
import IndeterminateCheckbox from "@/shared/components/form/IndeterminateCheckbox";

const ACTIONS = [{ name: "Approved" }, { name: "Rejected" }];

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
        `/organization/${oId}/program/${pId}/budget-cascading-approval`,
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
  const [action, setAction] = useState("");
  const [participants, setParticipants] = useState(null);
  const [filter, setFilter] = useState({ keyword: "" });
  const [loading, setLoading] = useState(true);

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

  const columns = React.useMemo(
    () => [...[SELECTION_COLUMN, ...TABLE_COLUMNS]],
    []
  );

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
        `/organization/${organization.id}/program/${program.id}/cascading-approvals`
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
            <TableFilter
              filter={filter}
              setFilter={setFilter}
              config={{ status: false }}
            />
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
