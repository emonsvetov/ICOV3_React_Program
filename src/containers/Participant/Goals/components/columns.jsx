export const GOAL_COLUMNS = [
  {
    Header: "name",
    accessor: "plan_name",
  },
  {
    Header: "date_begin",
    accessor: "date_begin",
    Cell: ({ row, value }) => {
        return `${new Date(value).toLocaleDateString("en-US", {})}`;
    },
  },
  {
    Header: "date_end",
    accessor: "date_end",
    Cell: ({ row, value }) => {
        return `${new Date(value).toLocaleDateString("en-US", {})}`;
    },
  },
  {
    Header: "target",
    accessor: "target_value",
    Cell: ({ row, value }) => {
      return Number(value).toFixed(2);
    },
  },
  {
    Header: "progress",
    accessor: "calc_progress_percentage",
    Cell: ({ row, value }) => {
      return `${Number(value).toFixed(2)}%`;
    },
  },
];

export const GOAL_SUMMARY_COLUMNS = [
  {
    Header: "date",
    accessor: "created_at",
    Cell: ({ row, value }) => {
        return `${new Date(value).toLocaleDateString("en-US", {})}`;
    },
  },
  {
    Header: "value",
    accessor: "progress_value",
  },
  {
    Header: "comment",
    accessor: "comment",
  },
  {
    Header: "reference_number",
    accessor: "ref_num",
  },
];
