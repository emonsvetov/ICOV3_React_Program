import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import PencilIcon from "mdi-react/PencilIcon";
import { useTable, usePagination, useRowSelect } from "react-table";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import ReportTableFilter from "@/shared/components/table/components/ReportTableFilter";
import { FILE_IMPORT_COLUMNS, FILE_IMPORT_DATA } from "./Mockdata";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const QUERY_PAGE_SIZE = 20;

const FileImport = () => {
  // console.log("ProgramUsers")
  const { t } = useTranslation();
  // const [users, setUsers] = useState(null);
  // const [currentRow, setCurrentRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ keyword: "" });
  // selectedFlatRows.map(d => d.original)/
  const onClickViewFile = (fileId) => {
    // getEvent(organization.id, program.id, eventId)
    // .then(item => {
    //   // console.log(item)
    //   setEvent(item)
    //   toggle('EditEvent');
    //   setLoading(false)
    // })
  };

  const RenderActions = ({ row }) => {
    return (
      <span>
        <Link to={{}} onClick={() => onClickViewFile(row.original.id)}>
          <PencilIcon style={{ marginRight: "0.5rem" }} />
          View
        </Link>
      </span>
    );
  };

  let final_columns = [
    ...FILE_IMPORT_COLUMNS,
    ...[
      {
        Header: "",
        accessor: "action",
        Cell: ({ row }) => <RenderActions row={row} />,
      },
    ],
  ];

  const columns = React.useMemo(() => final_columns, []);
  const data = React.useMemo(() => FILE_IMPORT_DATA, []);

  const totalPageCount = Math.ceil(data?.count / QUERY_PAGE_SIZE);

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
  } = useTable(
    {
      columns,
      // data: users ? users.results : [],
      data: data,
      initialState: {
        pageIndex: 0,
        pageSize: QUERY_PAGE_SIZE,
      },
      manualPagination: true, // Tell the usePagination
      pageCount: data ? totalPageCount : null,
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
    },
    usePagination,
    useRowSelect
  );

  // console.log(filter)
  /*
    useEffect(() => {
        let mounted = true;
        setLoading(true)
        apiTableService.fetchData(
            {
                url: `/organization/${organization.id}/program/${program.id}/user`,
                page: pageIndex,
                size: pageSize,
                filter
            }
        )
        .then(items => {
            if(mounted) {
                // console.log(items)
                setUsers(items)
                setLoading(false)
            }
        })
        return () => mounted = false;
    }, [getUsers, setLoading, setUsers, pageIndex, pageSize, filter])
    */

  useEffect(() => {
    // return setUsers[FileImport_DATA];
  }, []);

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

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <>
      <div className="users">
        <div className="header d-flex  justify-content-between">
          <ReportTableFilter filter={filter} setFilter={setFilter} />
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
              // dataLength={users.results.length}
              dataLength={data.length}
            />
          </>
        )}
      </div>

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

export default FileImport;
