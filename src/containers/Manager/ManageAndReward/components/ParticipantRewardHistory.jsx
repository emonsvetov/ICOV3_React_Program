import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { REWARD_HISTORY_COLUMNS } from "./columns";
import { Table} from "reactstrap";
import { connect } from "react-redux";
import { getUserEventHistory } from "@/services/program/getUserEvents";
import { useTranslation } from "react-i18next";
import ReactTablePagination from "@/shared/components/table/components/ReactTablePagination";

const PAGE_SIZE =10;

const ParticipantRewardHistory = ({ participant, auth, program, organization }) => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    let reward_history_columns = [
        ...REWARD_HISTORY_COLUMNS
        // Add any new columns here
        // {
        // }
    ];
    reward_history_columns.forEach((column, i) => {
        if (column.Header === 'Points') {
            reward_history_columns[i].Cell = ({ row, value }) => {
                // console.log(value * program.factor_valuation)
                return value * program.factor_valuation
            }
        }
    })
    const columns = React.useMemo(() => reward_history_columns, []);

    const tableInstance = useTable({
        columns,
        data: React.useMemo( () => data ? data : [], [data]),
        initialState: {
            pageIndex: 0,
            pageSize: 10,
        },
        manualPagination: true,
        pageCount: Math.ceil(count / PAGE_SIZE),
        autoResetSortBy: false,
        autoResetExpanded: false,
        autoResetPage: false,
    }, usePagination);

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
        (async () => {
            if (organization?.id && program?.id && participant?.id) {
                getUserEventHistory(organization.id, program.id, participant.id, pageIndex, 10)
                    .then(data => {
                        data.results.map(row => row.amount)
                        setData(data.results);
                        setCount(data.count);
                    })
                    .catch(error => {
                        console.log(error.response);
                    })
            }
        })();
    }, [pageIndex]);

   

    if (!data) return t("loading");

    return (
        <>
            <Table striped bordered hover size="md" {...getTableProps()}>
                <thead>
                    <tr>
                        <td colSpan={12} className="title">
                            <strong>Reward History</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
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
                        manualPageSize={[]}
                        dataLength={count}
                    />
                </>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        program: state.program,
        organization: state.organization,
    };
};

export default connect(mapStateToProps)(ParticipantRewardHistory);
