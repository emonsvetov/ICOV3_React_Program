import { showFormatDate } from "@/services/program/budget";

function BudgetType({ row, value }) {
  return (
    <>
      <p className="m-1 d-inline">{row.original.budget_types.title}</p>
    </>
  );
}

export const BUDGET_COLUMNS = [
  {
    Header: "Type",
    accessor: "type",
    Cell: BudgetType,
  },
  {
    Header: "Total Amount",
    accessor: "budget_amount",
  },
  {
    Header: "Remaining Amount",
    accessor: "remaining_amount",
  },
  {
    Header: "Start",
    accessor: "budget_start_date",
    Cell: showFormatDate,
  },
  {
    Header: "End",
    accessor: "budget_end_date",
    Cell: showFormatDate,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row, value }) => {
      return row.original.status ? "Active" : "Close";
    },
  },
];
