import React, { useState, useEffect } from "react";
import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import PeerIcon from "mdi-react/PostItNoteAddIcon";
import apiTableService from "@/services/apiTableService";
import { useTranslation } from "react-i18next";
import {inArray} from "@/shared/helpers"

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
  /*{ name: "Email", link: "", icon: <MailIcon /> },*/
  { name: "Resend Invite", link: "", icon: <ResendIcon /> },
  { name: "Deactivate", link: "", icon: <DeactivateIcon /> },
  { name: "Activate", link: "", icon: <ActivateIcon /> },
  //{ name: "Import", link: "", icon: <ImportIcon /> },
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

const BULK_ACTIONS = [
  "Reward",
  "Resend Invite",
  "Deactivate",
  "Activate",
  "Peer Allocation",
  "Reclaim Peer Allocations",
  "Add Goal"
]

const POINT_COLUMN_HEADERS = [
  "Peer Balance",
  "Redeemed",
  "Point Balance",
  "Points Earned"
]

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
}

const RenderActions = ({ row, onClickActionCb }) => {
  return ACTIONS.map((item, index) => {
    let statusLabel = item.name;
    //const currentStatus = row.original.status;
    const currentStatus = row.original.status?.status ? row.original.status.status : null
    // if(item.name === 'Deactivate') {
    //     const currentStatus = row.original.status.status;
    //     statusLabel = currentStatus === 'Deactivated' ? 'Activate' : 'Deactivate'
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
    return (
      <span
        key={index}
        onClick={() => onClickActionCb(item.name, row.original)}
      >
        <span className={`action-item ${item.name} hover-text`}>{item.icon}
          <div className={`tooltip-text`}>{statusLabel}</div>
        </span>
        <span className={`space-5`}></span>
      </span>
    );
  });
};

const ProgramParticipants = ({ program, organization }) => {
  const { t } = useTranslation();
  const [modalName, setModalName] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState(null);
  const [action, setAction] = useState("");
  const [queryPageSize, setQueryPageSize] = useState(QUERY_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ keyword: "", status: "" });
  const [participants, setParticipants] = useState([]);
  const [status, setStatus] = useState([]);

  const doAction = (action, participants) => {
    if (action === "Email") {
      const emails = collectEmails(participants);
      window.location.href = `mailto:${emails.join(
        ","
      )}?subject=You have received a message!`;
    }
    if ( inArray(action, BULK_ACTIONS) ) {
      toggle(action);
    }
  };

  useEffect(() => {
    if (action && participants) {
      doAction(action, participants);
      // toggle(action)
    }
  }, [action, participants]);

  const toggle = (name = null) => {
    if (name) setModalName(name);
    setOpen((prevState) => !prevState);
  }


  const onClickAction = (name, row) => {
    if (name == 'Name') {
      setParticipants(row);
    } else {
      setParticipants([row]);
    }
    toggle(name);
  }

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
    setQueryPageSize(value);
  }

  const onSelectStatus = (value) => {
    if (status.includes(value)) {
      setStatus(status.filter((item) => item !== value));
    } else {
      setStatus([...status, ...[value]]);
    }
    setMounted(true);
  }

  useEffect(() => {
    // console.log(mounted)
    if (status && mounted) {
      setFilter({ keyword: filter.keyword, status: status });
    }
    return () => setMounted(true);
  }, [status]);

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
        Cell: ({ row }) => <RenderActions row={row} onClickActionCb={onClickAction} />,
      }
    ],
  ];

  final_columns.forEach((column, i) => {
    if (column.Header === 'Name') {
      final_columns[i].Cell = ({ row, value }) => {
        return strShowName(column.Header, row.original)
      }
    }

    if ( inArray(column.Header, POINT_COLUMN_HEADERS) ) {
      final_columns[i].Cell = ({ row, value }) => {
        return value * program.factor_valuation
      }
    }
  })

  const columns = React.useMemo(() => final_columns, []);

  const totalPageCount = Math.ceil(users?.count / QUERY_PAGE_SIZE);

  const strShowName = (name, p) => {
    return p?.name ? <span onClick={() => onClickAction(name, p)} className={'link'}>{p.name}</span> : ''
  }

  const tableInstance = useTable(
    {
      columns,
      data: users ? users.results : [],
      initialState: {
        pageIndex: 0,
        pageSize: queryPageSize,
      },
      manualPagination: false, // Tell the usePagination
      pageCount: users ? totalPageCount : null,
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
    state: { pageIndex, pageSize, selectedRowIds },
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
      <UncontrolledDropdown>
        <DropdownToggle caret className="dropdowntoggle">
          Status
        </DropdownToggle>
        <DropdownMenu>
          {STATUS.map((item, index) => {
            // if(status.includes(item.name)){
            return (
              <DropdownItem
                key={`status-dropdown-item-${index}`}
                onClick={() => onSelectStatus(item.name)}
              >
                <input
                  checked={status.indexOf(item.name) > -1}
                  type="checkbox"
                  style={{ marginRight: "10px" }}
                  onChange={() => { }}
                />
                {item.name}
              </DropdownItem>
            );
            // }
            // else{
            //     return <DropdownItem  key={`status-dropdown-item-${index}`} onClick={() => onSelectStatus(item.name)}><input type="checkbox" style={{marginRight: '10px'}} />{item.name}</DropdownItem>
            // }
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <>
      <div className="users">
        <div className="header d-flex  justify-content-between">
          <div className="d-flex w-25 justify-content-between dropdown-group">
            <ActionsDropdown />
            <EntriesDropdown />
            <StatusDropdown />
          </div>
          <TableFilter filter={filter} setFilter={setFilter} />
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
              dataLength={users.results.length}
            />
          </>
        )}
      </div>
      <ModalWrapper
        name={modalName}
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
