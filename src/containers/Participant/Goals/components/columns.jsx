export const GOAL_COLUMNS = [
  {
    Header: "Name",
    accessor: "plan_name",
  },
  {
    Header: "Date Begin",
    accessor: "date_begin",
    Cell: ({ row, value }) => {
        return `${new Date(value).toLocaleDateString("en-US", {})}`;
    },
  },
  {
    Header: "Date End",
    accessor: "date_end",
    Cell: ({ row, value }) => {
        return `${new Date(value).toLocaleDateString("en-US", {})}`;
    },
  },
  {
    Header: "Target",
    accessor: "target_value",
    Cell: ({ row, value }) => {
      return Number(value).toFixed(2);
    },
  },
  {
    Header: "Progress",
    accessor: "calc_progress_percentage",
    Cell: ({ row, value }) => {
      return `${Number(value).toFixed(2)}%`;
    },
  },
];

export const GOAL_SUMMARY_COLUMNS = [
  {
    Header: "Date",
    accessor: "created_at",
    Cell: ({ row, value }) => {
        return `${new Date(value).toLocaleDateString("en-US", {})}`;
    },
  },
  {
    Header: "Value",
    accessor: "progress_value",
  },
  {
    Header: "Comment",
    accessor: "comment",
  },
  {
    Header: "Reference Number",
    accessor: "ref_num",
  },
];
