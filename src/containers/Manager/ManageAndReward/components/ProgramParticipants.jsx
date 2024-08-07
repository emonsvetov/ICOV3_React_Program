import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Dropdown,
} from "reactstrap";
import { useTable, usePagination, useRowSelect } from "react-table";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import TableFilter from "@/shared/components/table/components/TableFilter";
import IndeterminateCheckbox from "@/shared/components/form/IndeterminateCheckbox";
import { USERS_COLUMNS } from "./columns";
import { getUsers } from "@/services/program/getUsers";
import ModalWrapper from "./ModalWrapper";
import RewardIcon from "mdi-react/PostItNoteAddIcon";
import GoalIcon from "mdi-react/BullseyeArrowIcon";
import ResendIcon from "mdi-react/AccountPlusIcon";
import DeactivateIcon from "mdi-react/CancelIcon";
import ActivateIcon from "mdi-react/RefreshIcon";
import LockIcon from "mdi-react/LockIcon";
import ImportIcon from "mdi-react/ImportIcon";
import UnlockIcon from "mdi-react/LockOpenIcon";
import PeerIcon from "mdi-react/PostItNoteAddIcon";
import apiTableService from "@/services/apiTableService";
import { useTranslation } from "react-i18next";
import { inArray } from "@/shared/helpers";
import useCallbackState from "@/shared/useCallbackState";
import { useNavigate } from "react-router-dom";

const collectEmails = (users) => {
  let emails = [];
  users.map((user) => {
    emails.push(user.email);
  });
  return emails;
};

const QUERY_PAGE_SIZE = 10;

const ACTIONS = [
  { name: "Reward", link: "", icon: <RewardIcon /> },
  { name: "Add Goal", link: "", icon: <GoalIcon /> },
  //{ name: "Email", link: "", icon: <MailIcon /> },TODO: add logic to check engagement settings
  { name: "Resend Invite", link: "", icon: <ResendIcon /> },
  { name: "Deactivate", link: "", icon: <DeactivateIcon /> },
  { name: "Activate", link: "", icon: <ActivateIcon /> },
  { name: "Lock", link: "", icon: <LockIcon /> },
  { name: "Unlock", link: "", icon: <UnlockIcon /> },
  //{ name: "Import", link: "", icon: <ImportIcon /> }, TODO: add logic to check engagement settings
  { name: "Peer Allocation", link: "", icon: <PeerIcon /> }, 
];
const ENTRIES = [{ value: 10 }, { value: 25 }, { value: 50 }, { value: 100 }];

const STATUS = [
  { name: "Active" },
  { name: "Deactivated" },
  { name: "Locked" },
  { name: "New" },
  { name: "Pending Activation" },
  { name: "Pending Deactivation" },
];

let defaultStatus = [];
STATUS.map((item, index) => {
  if (item.name !== "Deactivated") {
    defaultStatus.push(item.name);
  }
});

const BULK_ACTIONS = [
  "Reward",
  "Resend Invite",
  "Deactivate",
  "Activate",
  "Lock","Unlock",
  "Peer Allocation",
  "Reclaim Peer Allocations",
  "Add Goal"
];

const POINT_COLUMN_HEADERS = [
  "Peer Balance",
  "Redeemed",
  "Point Balance",
  "Points Earned",
];

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

const RenderActions = ({ row, onClickActionCb }) => {
  return ACTIONS.map((item, index) => {
    let statusLabel = item.name;
    const currentStatus = row.original.status?.status ? row.original.status.status : null
    // if (item.name === "Activate") {
    //   return false;
    // }
    if (item.name === "Deactivate") {
      if (currentStatus === "Deactivated") {
        return false;
      } else if (currentStatus === null) {
        return false;
      }
      statusLabel = "Deactivate";
    }
    if (item.name === "Activate") {
      if (currentStatus === "Active") {
        return false;
      } else if (currentStatus === null) {
        return false;
      }
      statusLabel = "Activate";
    }
    if (item.name === "Lock") {
      if (currentStatus === "Locked" || currentStatus === "Deactivated") {
        return false;
      } else if (currentStatus === null) {
        return false;
      }
      statusLabel = "Lock";
    }
      if (item.name === "Unlock") {
          if (currentStatus !== "Locked") {
              return false;
          }
          statusLabel = "Unlock";
      }
    return (
      <span
        key={index}
        onClick={() => onClickActionCb(item.name, row.original)}
      >
        <span className={`action-item ${item.name} hover-text`}>
          {item.icon}
          <div className={`tooltip-text`}>{statusLabel}</div>
        </span>
        <span className={`space-5`}></span>
      </span>
    );
  });
};

const ProgramParticipants = ({ program, organization }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalName, setModalName] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [users, setUsers] = useState(null);
  const [action, setAction] = useState("");
  const [queryPageSize, setQueryPageSize] = useState(QUERY_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ keyword: "", status: [] });
  const [participants, setParticipants] = useState([]);
  const [statuses, setStatuses] = useCallbackState([]);
  const [actionsArray, setActionsArray] = useState(ACTIONS);
  const [bulkActionsArray, setBulkActionsArray] = useState(BULK_ACTIONS);
  const [isOpenToggle, setIsOpenToggle] = useState(false);

  const toggleStatus = () =>{
    setStatuses(() => filter.status, setIsOpenToggle(!isOpenToggle));
  } 

  const handleApply = (event) =>{
    // event.stopPropagation()
    setIsOpenToggle(!isOpenToggle);
    setFilter({ keyword: filter.keyword, status: statuses });
  }

  const handleClickStatus = (item) =>{
    // event.stopPropagation()
    if (statuses.includes(item.name)) {
      setStatuses( (prev) =>  prev.filter( (value) => value !== item.name ),
      (newStatus) =>{
        if(newStatus.length <= 0){
          setStatuses(defaultStatus)
        }
      }
    );
    } else {
      setStatuses([...statuses, ...[item.name]]);
    }
  }

  useEffect(() => {
    if (!program.uses_peer2peer) {
      bulkActionsArray.splice(BULK_ACTIONS.indexOf("Peer Allocation"), 1);
      let indexToRemove = actionsArray.findIndex(
        (item) => item.name == "Peer Allocation"
      );
      actionsArray.splice(indexToRemove, 1);
      setActionsArray(actionsArray);
      setBulkActionsArray(bulkActionsArray);
    }
  }, [program]);

  useEffect(() => {
    if (!program.uses_goal_tracker) {
      bulkActionsArray.splice(BULK_ACTIONS.indexOf("Add Goal"), 1);
      let indexToRemove = actionsArray.findIndex(
        (item) => item.name == "Add Goal"
      );
      actionsArray.splice(indexToRemove, 1);
      setActionsArray(actionsArray);
      setBulkActionsArray(bulkActionsArray);
    }
  }, [program]);

  const doAction = (action, participants) => {
    if (action === "Email") {
      const emails = collectEmails(participants);
      window.location.href = `mailto:${emails.join(
        ","
      )}?subject=You have received a message!`;
    }
    if (inArray(action, BULK_ACTIONS)) {
      toggle(action);
    }
  };

  useEffect(() => {
    if (action && participants) {
      doAction(action, participants);
    }
  }, [action, participants]);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  };

  const onClickAction = (name, row) => {
    if (name == "Name") {
      setParticipants(row);
    } else {
      setParticipants([row]);
    }
    toggle(name);
  };

  const onSelectAction = (name) => {
    const rows = selectedFlatRows.map((d) => d.original);
    if (rows.length === 0) {
      alert("Select participants");
      return;
    }
    setAction(name);
    setParticipants(rows);
  }

  const onSelectEntry = (value) => {
    const currentPageIndex = Math.floor(pageIndex * pageSize / value);
    setQueryPageSize(value);

    if (currentPageIndex >= Math.ceil(users.count / value)) {
      gotoPage(0);
    } else {
      gotoPage(currentPageIndex);
    }
  };

  const preColumns = React.useMemo(() => [
    ...[
      SELECTION_COLUMN,
      ...USERS_COLUMNS
    ],
  ], []);

  let final_columns = [
    ...[
      ...preColumns,
      {
        Header: "",
        accessor: "action",
        Footer: "Action",
        Cell: ({ row }) => (
          <RenderActions row={row} onClickActionCb={onClickAction} />
        ),
      },
    ],
  ];

  final_columns.forEach((column, i) => {
    if (column.Header === "Name") {
      final_columns[i].Cell = ({ row, value }) => {
        return strShowName(column.Header, row.original);
      };
    }

    if (inArray(column.Header, POINT_COLUMN_HEADERS)) {
      final_columns[i].Cell = ({ row, value }) => {
        return value * program.factor_valuation;
      };
    }
  });

  const columns = React.useMemo(() => final_columns, []);

  const totalPageCount = Math.ceil(users?.count / QUERY_PAGE_SIZE);

  const strShowName = (name, p) => {
    return p?.name ? (
      <span onClick={() => onClickAction(name, p)} className={"link"}>
        {p.name}
      </span>
    ) : (
      ""
    );
  };

  const tableInstance = useTable(
    {
      columns,
      data: useMemo(() => (users ? users.results : []), [users]),
      initialState: {
        pageIndex: 0,
        pageSize: queryPageSize,
        hiddenColumns: !program.uses_peer2peer ? ["peerBalance"] : []
      },
      manualPagination: true, // Tell the usePagination
      pageCount: Math.ceil(users?.count / queryPageSize),
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
    },
    usePagination,
    useRowSelect
  );

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
    state: { pageIndex, pageSize },
  } = tableInstance;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiTableService
      .fetchData({
        url: `/organization/${organization.id}/program/${program.id}/participant`,
        page: pageIndex,
        size: queryPageSize,
        filter,
      })
      .then((items) => {
        if (mounted) {
          // console.log(items)
          setUsers(items);
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, [getUsers, setLoading, setUsers, pageIndex, queryPageSize, filter]);

  useEffect(() => {
    if ( refreshUsers ) {
      setRefreshUsers(false);
      setFilter({ keyword: filter.keyword, status: defaultStatus });
    }
  }, [refreshUsers]);

  const manualPageSize = [];

  const UserTable = () => {
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

  useEffect(() => {
    // console.log(mounted)
    let mounted = false
    if ( !mounted ) {
      setStatuses( defaultStatus );
      setFilter({ keyword: filter.keyword, status: defaultStatus });
    }
    return () => {
      mounted = true;
    };
  }, []);

  const markStatusAsChecked = (statusName) => {
    if( statuses === null )  {
      // if( statusName !== 'Deactivated' ) return true;
    } else {
      return statuses.indexOf(statusName) > -1
    }
  };

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

  const EntriesDropdown = () => {
    return (
      <UncontrolledDropdown>
        <DropdownToggle caret className="dropdowntoggle">
          Show Entries({queryPageSize})
        </DropdownToggle>
        <DropdownMenu>
          {ENTRIES.map((item, index) => {
            return (
              <DropdownItem
                key={`entries-dropdown-item-${index}`}
                defaultValue={queryPageSize}
                onClick={() => onSelectEntry(item.value)}
              >
                {item.value}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };
  
  const StatusDropdown = () => {
    // console.log(status)
    return (
      <Dropdown isOpen={isOpenToggle} toggle={toggleStatus} >
        <DropdownToggle caret className="dropdowntoggle">
          {t("Filter by Status")}
        </DropdownToggle>
        <DropdownMenu>
          {STATUS.map((item, index) => {
            // if(status.includes(item.name)){
            return (
              <div key={`status-dropdown-item-${index}`}
                className="dropdown-item cursor-pointer" onClick={() =>handleClickStatus(item)}>
                <input
                  // checked={statuses.includes(item.name)}
                  checked={markStatusAsChecked(item.name)}
                  className="cursor-pointer"
                  id={`status-checkbox-${index}`}
                  type="checkbox"
                  style={{ marginRight: "10px" }}
                  value={item.name}
                  onChange={() => { }}
                />
                <label className="w-100 cursor-pointer" htmlFor={`status-checkbox-${index}`}>
                  {item.name}
                </label>
              </div>
            );
          })}
          <DropdownItem divider />
          <div className="dropdown-item cursor-pointer pl-3" onClick={handleApply}>
            <strong>Apply</strong>
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  };

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <>
      <div className="users">
        <div className="header d-flex  justify-content-between">
          <div className="d-flex w-30 justify-content-between dropdown-group">
            <ActionsDropdown />
            <EntriesDropdown />
            <StatusDropdown />
            <Button
              color="primary"
              onClick={() => navigate("/manager/csv-import")}
            >
              Import
            </Button>
          </div>
          <TableFilter filter={filter} setFilter={setFilter} config={{status: true}}/>
        </div>
        <UserTable />
      </div>
      <div className="my-3 status">
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
              dataLength={users ? users.count : 0}
            />
          </>
        )}
      </div>
      <ModalWrapper
        name={modalName}
        setRefreshUsers={setRefreshUsers}
        isOpen={isOpen}
        setOpen={setOpen}
        toggle={toggle}
        participants={participants}
      />
      {/* <pre>
            <code>
                {JSON.stringify(
                {
                    selectedRowIds: selectedRowIds,
                    'selectedFlatRows[].original': selectedFlatRows.map(
                    d => d.original
                    ),
                },
                null,
                2
                )}
            </code>
            </pre> */}
    </>
  );
};

export default ProgramParticipants;
