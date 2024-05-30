import React, {useMemo, useState, useEffect} from 'react';
import {connect} from "react-redux";
import {format} from "date-fns";
import { useTable, usePagination, useRowSelect, useSortBy, useExpanded, useResizeColumns } from "react-table";
import { Row, Col, Table, Card, CardBody  } from 'reactstrap';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {reducer, fetchApiData, initialState, Sorting, fetchApiDataExport, useEffectToDispatch} from "@/shared/apiTableHelper"
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
// import ReportTableFilter from "@/shared/components/table/components/ReportTableFilter";
import InvoiceFilter from './InvoiceFilter';
import { dateStrToYmd, getFirstDay } from '@/shared/helpers';
import { clone} from 'lodash';

const queryClient = new QueryClient()

const InvoicesDataTable = (props) => {
    const {program, programs} = props
    const INVOICES_COLUMNS = [
        {
            Header: "Invoice Number",
            accessor: "invoice_number",
        },
        {
            Header: "Start Date",
            accessor: "date_begin",
            Cell: ({ row, value }) => { return format(new Date(value), "MM/dd/yyyy")}
        },
        {
            Header: "End Date",
            accessor: "date_end",
            Cell: ({ row, value }) => { return format(new Date(value), "MM/dd/yyyy")}
        }
    ]

    const [loading, setLoading] = useState(false)

    const [filter, setFilter] = useState({
        programs: programs,
        createdOnly: false,
        reportKey: 'sku_value',
        programId: program?.id,
        from: dateStrToYmd(getFirstDay()),
        to: dateStrToYmd(new Date())
      });
      const [useFilter, setUseFilter] = useState(false);
      const [trigger, setTrigger] = useState(0);
      const [exportData, setExportData] = useState([]);
      const [exportHeaders, setExportHeaders] = useState([]);
      const [exportToCsv, setExportToCsv] = useState(false);
      const exportLink = React.createRef();

    const onClickViewInvoice = (invoice) => {
        props.setInvoice(invoice)
        props.setStep(1)
    }

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

    const RenderActions = ({row}) => {
        return (
            <span>
                <a className='link' style={{cursor: 'pointer'}} onClick={() => onClickViewInvoice(row.original)}>View</a>
            </span>
        )
    }

    let invoices_columns = [
        ...INVOICES_COLUMNS,
        ...[{
            Header: "Actions",
            accessor: "action",
            Cell: ({ row }) => <RenderActions row={row} />,
        }]
    ]

    let columns = useMemo( () => invoices_columns, [])

    const [{queryPageIndex, queryPageSize, totalCount, queryPageFilter, queryPageSortBy, queryTrigger}, dispatch] =
    React.useReducer(reducer, initialState);

    const apiUrl = `/organization/${props.program?.organization_id}/program/${props.program?.id}/invoice`

    const { isLoading, error, data, isSuccess } = useQuery(
        ['invoices', apiUrl, queryPageIndex, queryPageSize, queryPageFilter, queryPageSortBy, queryTrigger],
        () => fetchApiData(
            {
                url: apiUrl,
                page: queryPageIndex,
                size: queryPageSize,
                filter,
                sortby: queryPageSortBy,
                trigger: queryTrigger
            }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
        }
    );

    const totalPageCount = Math.ceil(data?.count / queryPageSize)

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
    // const { pageIndex, pageSize } = state;
    useEffectToDispatch( dispatch, {pageIndex, pageSize, gotoPage, sortBy, filter, data, useFilter, trigger} );
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    if(isSuccess)
        return(
        <>
            <div className='table react-table report-table'>
                <div className="action-panel">
                    <Row className="mx-0">
                    <Col>
                        <InvoiceFilter
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
                
                    <table {...getTableProps()} className="table">
                        <thead>
                            {headerGroups.map( (headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map( column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            {column.isSorted ? <Sorting column={column} /> : ''}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="table table--bordered" {...getTableBodyProps()}>
                            {page.map( row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map( cell => {
                                                // console.log(cell)
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
            {(rows.length > 0) && (
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
                        dataLength={data?.count}
                        />
               
            )}
        </>
    );
};

const TableWrapper = (props) => {
    const {program, organization} = props;
    if (!organization || !program) return 'Loading...'
    return (
        <QueryClientProvider client={queryClient}>
          <InvoicesDataTable {...props} />
        </QueryClientProvider>
    )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    program: state.program,
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(TableWrapper);
