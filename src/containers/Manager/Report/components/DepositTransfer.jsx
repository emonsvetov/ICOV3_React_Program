import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";

import { useTable, usePagination, useRowSelect } from "react-table";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import ReportTableFilter from "@/shared/components/table/components/ReportTableFilter";
import { DEPOSIT_TRANSFER_COLUMNS, DEPOSIT_TRANSFER_DATA } from "./Mockdata";
import { useTranslation } from "react-i18next";

const QUERY_PAGE_SIZE = 20;

const DepositTransfer = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ keyword: "" });
  // selectedFlatRows.map(d => d.original)/

  let final_columns = [
    ...DEPOSIT_TRANSFER_COLUMNS,
    ...[
      {
        Header: "",
        accessor: "action",
        Footer: "Action",
      },
    ],
  ];

  const columns = React.useMemo(() => final_columns, []);
  const data = React.useMemo(() => DEPOSIT_TRANSFER_DATA, []);

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
    // return setUsers[DEPOSIT_TRANSFER_DATA];
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
    </>
  );
};

export default DepositTransfer;
