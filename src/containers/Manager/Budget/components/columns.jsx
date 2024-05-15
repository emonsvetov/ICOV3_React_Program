import {showFormatDate} from "@/services/program/budget"

function BudgetType({ row, value }) {
  return (
    <>
      <p className="m-1 d-inline">{row.original.budget_types.name}</p>
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
    Cell:showFormatDate
  },
  {
    Header: "End",
    accessor: "budget_end_date",
    Cell:showFormatDate
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row, value }) => {
      return row.original.status ? "Active" : "Deleted";
    },
  },
];

export const BUDGETDUMMYDATA = [
  {
    id: 1,
    type: "monthly",
    start: "march-2024",
    total_amount: "$150",
    remaining_amount: "$150",
    end: "april-2024",
    status: "Open",
  },
  {
    id: 2,
    type: "monthly",
    start: "may-2024",
    total_amount: "$100",
    remaining_amount: "$100",
    end: "june-2024",
    status: "Open",
  },
  {
    id: 3,
    type: "specified_period",
    start: "05-05-2024",
    total_amount: "$120",
    remaining_amount: "$120",
    end: "30-05-2024",
    status: "Open",
  },
  {
    id: 4,
    type: "monthly_rollover",
    start: "may-2024",
    total_amount: "$100",
    remaining_amount: "$100",
    end: "june-2024",
    status: "Open",
  },
  {
    id: 5,
    type: "yearly",
    start: "01/01/2025",
    end: "12/31/2025",
    total_amount: "$1000",
    remaining_amount: "$1000",
    status: "Open",
  },
];
