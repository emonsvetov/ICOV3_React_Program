import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { useTable } from 'react-table'
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { readListByProgramAndUser } from "@/services/program/readListByProgramAndUser";
import { USER_GOALS_COLUMNS } from "./columns";

const ParticipantGoalPlans = ({ participant, program, organization }) => {
  const [usergoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const onClickEditUserPlan = (goalplanId) => {
    //TO DO
    /*getGoalPlan(organization.id, program.id, goalplanId)
    .then(item => {
     // console.log("edit goal plan")
      setGoalPlan(item)
      toggle('EditGoalPlan');
      setLoading(false)
    })*/
  }

  useEffect(() => {
    (async () => {
      if (organization?.id && program?.id && participant?.id) {
        readListByProgramAndUser(organization.id, program.id, participant.id)
          .then(data => {
            setUserGoals(data)
            setLoading(false)
          })
          .catch(error => {
            console.log(error.response.data);
          })
      }
    })();
  }, []);

  let final_columns = [
    ...USER_GOALS_COLUMNS,
    /* TO DO
    ...[{
        Header: "Actions",
       // accessor: "action",
        Footer: "Action",
        Cell: ({ row }) => {
          return (
            row.deleted ? 'Deleted' : <Link to={{}} onClick={() => onClickEditUserPlan(row.original.id)}><PencilIcon style={{marginRight: "0.5rem"}}/>Edit</Link> 
            );
        },
    }]*/
  ]
  const columns = React.useMemo(() => final_columns, []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data: usergoals })

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  return (
    <>
      <Table striped bordered size="md" {...getTableProps()}>

        <thead>
          <tr>
            <td colSpan={12} className="title">
              <strong>User Goals</strong>
            </td>
          </tr>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
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
export default connect(mapStateToProps)(ParticipantGoalPlans);