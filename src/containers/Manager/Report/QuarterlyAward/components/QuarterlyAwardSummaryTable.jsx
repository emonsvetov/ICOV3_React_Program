import React, {useEffect, useMemo, useState} from "react";
import {useExpanded,  usePagination, useResizeColumns, useSortBy, useTable} from "react-table";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import ReactTablePagination from '@/shared/components/table/components/ReactTablePagination';
import {Col, Row} from 'reactstrap';
import {getFirstDay, dateStrToYmd} from '@/shared/helpers'

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
import ParticipantAccountSummaryFilter from "./QuarterlyAwardSummaryFilter";

const queryClient = new QueryClient()

const DataTable = ({organization, program, programs}) => {
  const [filter, setFilter] = useState({
    programs: programs,
    createdOnly: false,
    reportKey: 'sku_value',
    programId: program.id,
    from: dateStrToYmd(getFirstDay()),
    to: dateStrToYmd(new Date()),
    year: new Date().getFullYear()
  });
  const [useFilter, setUseFilter] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [exportData, setExportData] = useState([]);
  const [exportHeaders, setExportHeaders] = useState([]);
  const [exportToCsv, setExportToCsv] = useState(false);
  const exportLink = React.createRef();
  let Q1_total_value = 0;
  let Q1_total_count = 0;
  let Q2_total_value = 0;
  let Q2_total_count = 0;
  let Q3_total_value = 0;
  let Q3_total_count = 0;
  let Q4_total_value = 0;
  let Q4_total_count = 0;
  let ytd_total_value  = 0;
  let ytd_total_count  = 0;
  const [{queryPageIndex, queryPageSize, totalCount, queryPageFilter, queryPageSortBy, queryTrigger}, dispatch] =
    React.useReducer(reducer, initialState);

  const apiUrl = `/organization/${organization.id}/report/quarterly-award-summary`;
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

  const response = await fetchApiDataExport(
      {
        url: apiUrl,
        filter: tmpFilter,
        sortby: queryPageSortBy,
        trigger: queryTrigger
      }
    );
    console.log(response)
    setExportData(response.results);
    setExportHeaders(response.headers);
    setExportToCsv(true);
  }

  let tableHeaders = [...TABLE_COLUMNS]
  
  let columns = useMemo(() => tableHeaders, [])

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
                <ParticipantAccountSummaryFilter
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
              {headerGroups.map((headerGroup, id) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      {column.isSorted ? <Sorting column={column}/> : ''}
                    </th>
                    
                  ))}
                  {id == 0 && <th>
                      As of {data?.full.filter.year}
                  </th>}
                  {id == 1 && 
                  <>
                  <th colSpan="1" role="columnheader" title="Toggle SortBy">
                    Value</th>
                  <th colSpan="1" role="columnheader" title="Toggle SortBy">
                  Count</th>
                  </>
                    }
                </tr>
              ))}
             
              </thead>
              <tbody className="table table--bordered" {...getTableBodyProps()} >
              {page.map((row,id) => {
                prepareRow(row);
                const subCount = (row.id.match(/\./g) || []).length
                const subRows = row.subRows;
                const countSubRows = subRows ? subRows.length : 0;
                const rowSpan = countSubRows ? countSubRows + 1 : 1;

                Q1_total_value+=row.values.Q1_value;
                Q1_total_count+=row.values.Q1_count;
                
                Q2_total_value+=row.values.Q2_value;
                Q2_total_count+=row.values.Q2_count;
                
                Q3_total_value+=row.values.Q3_value;
                Q3_total_count+=row.values.Q3_count;
                
                Q4_total_value+=row.values.Q4_value;
                Q4_total_count+=row.values.Q4_count;

                ytd_total_value += data.results[id].YTD_value;
                ytd_total_count += data.results[id].YTD_count;
                
                return (
                  <>
                    <tr {...row.getRowProps()} key={row.id}>
                      {
                        row.cells.map(cell => {
                          // console.log(cell)
                          const skip = cell.value === 'skip_td';
                          if (skip) return null;
                          const paddingLeft = subCount * 20
                          return(
                          <> 
                            <td {...cell.getCellProps()} rowSpan={rowSpan} key={cell.column.id + row.id}>
                                              <span
                                                style={cell.column.Header === '#' ? {paddingLeft: `${paddingLeft}px`} : null}>{cell.render('Cell')}</span>
                            </td>
                          </>
                        )})
                      }
                      <td rowSpan={rowSpan}>
                        <span
                            style={ {paddingLeft: `${subCount * 20}px`}}>{data?.results[id].YTD_value}</span>
                      </td>
                      <td rowSpan={rowSpan}>
                        <span
                            style={ {paddingLeft: `${subCount * 20}px`}}>{data?.results[id].YTD_count}</span>
                      </td>
                    </tr>
                    {countSubRows > 0 && subRows.map(subRow => {
                      // console.log(subRow)
                      prepareRow(subRow);
                      return (
                        <tr {...subRow.getRowProps()} key={subRow.id}>
                          {
                            subRow.cells.map(subCell => {
                              // console.log(subCell)
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
                <td>
                  Total
                </td>
                <td>
                  ${parseFloat(Q1_total_value)?.toFixed(2)}
                </td>
                <td>
                  {Q1_total_count}
                </td>
                <td>
                  ${parseFloat(Q2_total_value)?.toFixed(2)}
                </td>
                <td>
                  {Q2_total_count}
                </td>
                <td>
                  ${parseFloat(Q3_total_value)?.toFixed(2)}
                </td>
                <td>
                  {Q3_total_count}
                </td>
                <td>
                  ${parseFloat(Q4_total_value)?.toFixed(2)}
                </td>
                <td>
                  {Q4_total_count}
                </td>
                <td>
                  ${parseFloat(ytd_total_value)?.toFixed(2)}
                </td>
                <td>
                  {ytd_total_count}
                </td>
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
