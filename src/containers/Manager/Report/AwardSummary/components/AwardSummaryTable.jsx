import React, {useEffect, useMemo, useState} from "react";
import {useExpanded,  usePagination, useResizeColumns, useSortBy, useTable} from "react-table";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import ReactTablePagination from '@/shared/components/table/components/ReactTablePagination';
import {Col, Row} from 'reactstrap';
import {getFirstDay} from '@/shared/helpers'

import {TABLE_COLUMNS} from "./columns";

import {connect} from "react-redux";
import {
  reducer,
  useEffectToDispatch,
  fetchApiData,
  fetchApiDataExport,
  initialState,
 
  Sorting
} from "@/shared/apiTableHelper"

import { clone} from 'lodash';
import AwardSummaryFilter from "./AwardSummaryFilter";

const queryClient = new QueryClient()

const DataTable = ({organization, program, programs}) => {
  const [filter, setFilter] = useState({
    programs: programs,
    // createdOnly: false,
    programId: program.id,
    // from: getFirstDay(),
    // to: new Date(),
    year: new Date().getFullYear()
  });
  let pageLength = 0;
  const [useFilter, setUseFilter] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [exportData, setExportData] = useState([]);
  const [exportHeaders, setExportHeaders] = useState([]);
  const [exportToCsv, setExportToCsv] = useState(false);
  const exportLink = React.createRef();

  const [{queryPageIndex, queryPageSize, totalCount, queryPageFilter, queryPageSortBy, queryTrigger}, dispatch] =
    React.useReducer(reducer, initialState);

  const apiUrl = `/organization/${organization.id}/report/award-summary`;
  const {isLoading, error, data, isSuccess} = useQuery(
    ['', apiUrl, queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy, queryTrigger],
    () => fetchApiData(
      {
        url: apiUrl,
        page: queryPageIndex,
        size: queryPageSize,
        filter,
        sortby: queryPageSortBy,
        trigger: queryTrigger
      }
    ),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (exportToCsv) {
      if (exportLink.current) {
        setExportToCsv(false);
        exportLink.current.link.click();
      }
    }
  }, [exportLink])

  const download = async (filterValues) => {
    let tmpFilter = clone(filterValues);
    tmpFilter.exportToCsv = 1;
    tmpFilter.server = 'program';

    const response = await fetchApiDataExport(
      {
        url: apiUrl,
        filter: tmpFilter,
        sortby: queryPageSortBy,
        trigger: queryTrigger
      }
    );
    // console.log(response)
    setExportData(response.results);
    setExportHeaders(response.headers);
    setExportToCsv(true);
  }

  let columns = useMemo(() => TABLE_COLUMNS, [])

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
  useEffectToDispatch(dispatch, {pageIndex, pageSize, gotoPage, sortBy, filter, data, useFilter, trigger});

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (isSuccess)
    return (
      <>
        <div className='table react-table report-table'>
          <div className="action-panel">
            <Row className="mx-0">
              <Col>
                <AwardSummaryFilter
                  filter={filter} setFilter={setFilter} useFilter={useFilter} setUseFilter={setUseFilter}
                  exportData={exportData} exportLink={exportLink} exportHeaders={exportHeaders}
                  download={download}/>
              </Col>
            </Row>
          </div>
          {
            isLoading && <p>Loading...</p>
          }
          {
            isSuccess &&
            <table {...getTableProps()} className="table table-striped report-table">
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
              <tbody className="table table--bordered" {...getTableBodyProps()} >
              {
                page.map(row => {
                prepareRow(row);
                const subCount = (row.id.match(/\./g) || []).length
                const subRows = row.subRows;

                const countSubRows = subRows ? subRows.length : 0;
                const rowSpan = countSubRows ? countSubRows + 1 : 1;
                return (
                  <>
                    <tr {...row.getRowProps()} key={row.id}>
                      {
                        row.cells.map(cell => {
                          const skip = cell.value === 'skip_td';
                          if (skip) return null;
                          const paddingLeft = subCount * 20
                          return <td {...cell.getCellProps()} rowSpan={cell.column.enableRowSpan ? rowSpan : 1} key={cell.column.id + row.id}>
                                            <span
                                              style={cell.column.Header === '#' ? {paddingLeft: `${paddingLeft}px`} : null}>{cell.render('Cell')}</span>
                          </td>
                        })
                      }
                    </tr>
                    {countSubRows > 0 && subRows.map(subRow => {
                      pageLength = pageLength + 1;
                      prepareRow(subRow);
                      return (
                        <tr {...subRow.getRowProps()} key={subRow.id}>
                          {
                            subRow.cells.map(subCell => {
                              if (subCell.column.enableRowSpan) return null;
                              const skip = subCell.value === 'skip_td';
                              if (skip) return null;
                              return <td {...subCell.getCellProps()} key={subCell.column.id + subRow.id}>
                                <span>{subCell.render('Cell')}</span>
                              </td>
                            })
                          }
                        </tr>
                      )
                    })}
                  </>
                )
              })}
              </tbody>
              <tfoot>
              {footerGroups.map((footerGroup) => (
                <tr {...footerGroup.getFooterGroupProps()}>
                  {footerGroup.headers.map(column => (
                    <th {...column.getFooterProps()}>{column.render('Footer')}</th>
                  ))}
                </tr>
              ))}
              </tfoot>
            </table>
          }

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
                pageLength={pageLength}
              />
            </>
          )}
        </div>
      </>
    )
}

const TableWrapper = ({organization, program, programs}) => {
  if (!organization || !program) return 'Loading...'
  return (
    <QueryClientProvider client={queryClient}>
      <DataTable organization={organization} program={program} programs={programs}/>
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