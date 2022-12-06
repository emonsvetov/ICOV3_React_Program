export const GOAL_COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Date Begin",
    accessor: "date_begin",
  },
  {
    Header: "Date End",
    accessor: "date_end",
  },
  {
    Header: "Target",
    accessor: "target",
    Cell: ({ row, value }) => {
      return Number(value).toFixed(2);
    },
  },
  {
    Header: "Progress",
    accessor: "progress",
    Cell: ({ row, value }) => {
      return `${Number(value).toFixed(2)}%`;
    },
  },
];

export const GOAL_SUMMARY_COLUMNS = [
  {
    Header: "Date",
    accessor: "date_begin",
  },
  {
    Header: "Value",
    accessor: "value",
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
