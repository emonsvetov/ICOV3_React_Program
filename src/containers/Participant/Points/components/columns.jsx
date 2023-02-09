export const SUMMARY_COLUMNS = [
  {
    Header: "Event",
    accessor: "name",
  },
  {
    Header: "Points",
    accessor: "points",
    Cell: ({ row, value }) => {
      return parseInt(value);
    },
  },
];

export const DETAIL_COLUMNS = [
  {
    Header: "Event",
    accessor: "name",
  },
  {
    Header: "Date",
    accessor: "journal_event_timestamp",
    Cell: ({ row, value }) => {
      return `${new Date(value).toLocaleDateString("en-US", {})}`;
    },
  },
  {
    Header: "Points",
    accessor: "amount",
  },
];
