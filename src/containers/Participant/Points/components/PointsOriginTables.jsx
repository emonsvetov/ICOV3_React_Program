import React from "react";
import { Table } from "reactstrap";
import { useTable } from "react-table";

const PointsTemplateTable = ({ title, table_columns, table_data }) => {
  const columns = React.useMemo(() => table_columns, []);
  const data = React.useMemo(() => table_data, []);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <>
      <div className={`${template.name}-table`}>
        <Table striped bordered hover size="md" {...getTableProps()}>
          <thead>
            <tr>
              <td colSpan={4} className="title">
                {" "}
                {title}
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
      </div>
    </>
  );
};

export default PointsTemplateTable
