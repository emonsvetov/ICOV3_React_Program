import React, {useMemo, useState, useEffect} from 'react';
import {connect} from "react-redux";

import { useTable, usePagination, useRowSelect, useSortBy } from "react-table";
import { Row, Col, Table, Card, CardBody  } from 'reactstrap';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {reducer, fetchApiData, initialState, Sorting} from "@/shared/apiTableHelper"
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";
import ReportTableFilter from "@/shared/components/table/components/ReportTableFilter";

const queryClient = new QueryClient()

const InvoicesDataTable = (props) => {

    const INVOICES_COLUMNS = [
        {
            Header: "Invoice Number",
            accessor: "invoice_number",
        },
        {
            Header: "Start Date",
            accessor: "date_begin"
        },
        {
            Header: "End Date",
            accessor: "date_end"
        }
    ]

    const [loading, setLoading] = useState(false)

    const onClickViewInvoice = (invoice) => {
        props.setInvoice(invoice)
        props.setStep(1)
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

    const [{ queryPageIndex, queryPageSize, totalCount, queryPageSortBy, queryTrigger }, dispatch] =
    React.useReducer(reducer, initialState);

    const apiUrl = `/organization/${props.program.organization_id}/program/${props.program.id}/invoice`

    const { isLoading, error, data, isSuccess } = useQuery(
        ['invoices', apiUrl, queryPageIndex, queryPageSize, queryPageSortBy, queryTrigger],
        () => fetchApiData(
            {
                url: apiUrl,
                page: queryPageIndex,
                size: queryPageSize,
                sortby: queryPageSortBy,
                trigger: queryTrigger
            }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
        }
    );

    const totalPageCount = Math.ceil(totalCount / queryPageSize)

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
        state: { pageIndex, pageSize, sortBy, pageFilter }
    } = useTable({
        columns,
        data: data ? data.results : [],
        initialState: {
            pageIndex: queryPageIndex,
            pageSize: queryPageSize,
            sortBy: queryPageSortBy
        },
        manualPagination: true, // Tell the usePagination
        pageCount: data ? totalPageCount : null,
        autoResetSortBy: false,
        autoResetExpanded: false,
        autoResetPage: false,
    },
    useSortBy,
    usePagination,
    useRowSelect
    );

    const manualPageSize = []
    // const { pageIndex, pageSize } = state;

    //useEffectToDispatch( dispatch, {pageIndex, pageSize, gotoPage, sortBy, data, trigger: props.trigger} );

    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    return(
        <>
            <Row className='w100'>
                <Col md="6" lg="6" xl="6">
                    <div className="modal__title">
                        <h3 className="mb-4">Program's Invoices</h3>
                    </div>
                </Col>
            </Row>

            {isLoading ? (
                <p>Loading Please wait...</p>
            ) : (
                <>
                    <div className='table react-table'>
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
                        dataLength={rows.length}
                        />
                    )}
                </>
            )}
        </>
    );
};

const TableWrapper = (props) => {
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
