import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { REWARD_HISTORY_COLUMNS } from "./columns";
import { Table} from "reactstrap";
import { connect } from "react-redux";
import { getUserEventHistory } from "@/services/program/getUserEvents";
import { useTranslation } from "react-i18next";

const ParticipantRewardHistory = ({ participant, auth, program, organization }) => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
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
    useEffect(() => {
        (async () => {
            if (organization?.id && program?.id && participant?.id) {
                getUserEventHistory(organization.id, program.id, participant.id, 0, 10)
                    .then(data => {
                        data.results.map(row => row.amount)
                        setData(data.results);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    })
            }
        })();
    }, []);
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });
    if (!data) return t("loading");

    return (
        <>
            <Table striped bordered hover size="md" {...getTableProps()}>
                <thead>
                    <tr>
                        <td colSpan={4} className="title">
                            Reward History
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
