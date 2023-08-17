import React, { useState, useMemo } from "react";
import { useTable, usePagination, useSortBy, useExpanded, useResizeColumns } from "react-table";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import ReactTablePagination from '@/shared/components/table/components/ReactTablePagination';

import {connect} from "react-redux";

import { MONIES_AVAILABLE_POSTINGS_COLUMNS } from "./columns";
import {reducer, useEffectToDispatch, fetchApiData, initialState, TableFilter, Sorting} from "@/shared/apiTableHelper"
// import { getinvoiceNotificationRecipients } from '@/services/invoice/getinvoiceNotificationRecipients'
import { useDispatch, flashError, flashSuccess } from "@/shared/components/flash"

const queryClient = new QueryClient()
const useFilter = false
const filter = null

const MoniesAvailablePostings = ({ program, organization }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [{ queryPageIndex, queryPageSize, totalCount, queryPageFilter, queryPageSortBy, queryTrigger }, dispatch] =
  React.useReducer(reducer, initialState);

  const apiUrl = `/organization/${organization.id}/program/${program.id}/monies-available-postings`;
  const {isLoading, error, data, isSuccess} = useQuery(
    ['Name_MoniesAvailablePostings', apiUrl, queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy, queryTrigger],
    () => fetchApiData(
      {
        url: apiUrl,
        page: queryPageIndex,
        size: queryPageSize,
        sortby: queryPageSortBy,
        trigger: queryTrigger
      }
    ),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  let columns = useMemo(() => MONIES_AVAILABLE_POSTINGS_COLUMNS, [])
  const totalPageCount = Math.ceil(totalCount / queryPageSize)

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
    state: {pageIndex, pageSize, sortBy}
  } = useTable({
      columns: columns,
      data: data ? Object.values(data.results) : [],
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
        sortBy: queryPageSortBy,
      },
      manualPagination: true, // Tell the usePagination
      pageCount: data ? totalPageCount : null,
      autoResetSortBy: false,
      autoResetExpanded: false,
      autoResetPage: false,
      disableResizing: true,
      autoResetHiddenColumns: false,
      striped: true
    },
    useSortBy,
    useExpanded,
    usePagination,
    useResizeColumns,
    // useFlexLayout,
  );

  const manualPageSize = []
  useEffectToDispatch(dispatch, {pageIndex, pageSize, gotoPage, sortBy, filter, data, useFilter});

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  
  if (isSuccess)
    return (
      <>
        <Table striped borderless size="md" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? <Sorting column={column}/> : ''}
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
        {(rows.length > 0) && (
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
      </>
    );
};

const TableWrapper = ({organization, program}) => {
  if (!organization || !program) return 'Loading...'
  return (
    <QueryClientProvider client={queryClient}>
      <MoniesAvailablePostings organization={organization} program={program}/>
    </QueryClientProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    program: state.program,
    organization: state.organization,
  };
};
export default connect(mapStateToProps)(TableWrapper);
