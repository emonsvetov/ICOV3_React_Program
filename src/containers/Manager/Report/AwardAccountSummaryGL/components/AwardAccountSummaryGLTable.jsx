import React, {useEffect, useMemo, useState} from "react";
import {useExpanded,  usePagination, useResizeColumns, useSortBy, useTable} from "react-table";
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import ReactTablePagination from '@/shared/components/table/components/ReactTablePagination';
import {Col, Row} from 'reactstrap';

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
import AwardAccountSummaryGLFilter from "./AwardAccountSummaryGLFilter";

const queryClient = new QueryClient()

const getFirstDay = () =>{
  let date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const DataTable = ({organization, program, programs}) => {
  const [filter, setFilter] = useState({
    programs: programs,
    createdOnly: false,
    reportKey: 'sku_value',
    programId: program.id,
    from: getFirstDay(),
    to: new Date()
  });
  const [useFilter, setUseFilter] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [exportData, setExportData] = useState([]);
  const [exportHeaders, setExportHeaders] = useState([]);
  const [exportToCsv, setExportToCsv] = useState(false);
  const exportLink = React.createRef();

  const [{queryPageIndex, queryPageSize, totalCount, queryPageFilter, queryPageSortBy, queryTrigger}, dispatch] =
    React.useReducer(reducer, initialState);

  const apiUrl = `/organization/${organization.id}/report/award-account-summary-gl`;
  const {isLoading, error, data, isSuccess} = useQuery(
    ['', apiUrl, queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy, queryTrigger],
    () => fetchApiData(
      {
        url: apiUrl,
        page: 0,
        size: 9999,
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
    // console.log(response)
    setExportData(response.results);
    setExportHeaders(response.headers);
    setExportToCsv(true);
  }

  const tableColumns = data && data.results && data.results.length > 0 ? Object.keys(data.results[0]).map((key, id)=>{
    return {
      id: key.toString(),
      Header: ({ row, value }) => { return <span dangerouslySetInnerHTML={{__html: key}} /> },
      accessor: key,
    }
  }) : [];

  let columns = useMemo(() => tableColumns, [data])

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
      columns: columns, //columns,
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
                <AwardAccountSummaryGLFilter
                  filter={filter} setFilter={setFilter} useFilter={useFilter} setUseFilter={setUseFilter}
                  exportData={exportData} exportLink={exportLink} exportHeaders={exportHeaders}
                  download={download}/>
              </Col>
            </Row>
          </div>
          {
            isLoading && <p>Loading...</p>
          }
          {/*total table*/}
          <div className='table report-table' style={{width: '400px'}} >
            {
              isSuccess && data &&
              <table className="table table-striped report-table">
                <thead>
                <tr key="tr0">
                  <th key="th0_1"></th>
                  <th key="th0_2">Total for period</th>
                </tr>
                </thead>
                <tbody className="table table--bordered" >
                <tr key="tr1">
                  <td key="td1_1">Total Amount Awarded</td>
                  <td key="td1_2">{ data.full['TotalAwards'] }</td>
                </tr>
                <tr key="tr2">
                  <td key="td2_1">Total Amount Reclaimed</td>
                  <td key="td2_2">{ data.full['TotalReclaimed'] }</td>
                </tr>
                </tbody>
              </table>
            }
          </div>
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
              {page.map(row => {
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
                          // console.log(cell)
                          const skip = cell.value === 'skip_td';
                          if (skip) return null;
                          const paddingLeft = subCount * 20
                          return <td {...cell.getCellProps()} rowSpan={rowSpan} key={cell.column.id + row.id}>
                                            <span
                                              style={cell.column.Header === '#' ? {paddingLeft: `${paddingLeft}px`} : null}>{cell.render('Cell')}</span>
                          </td>
                        })
                      }
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