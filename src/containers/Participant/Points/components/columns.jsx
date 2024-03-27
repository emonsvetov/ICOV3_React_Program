export const SUMMARY_COLUMNS = [
  {
    Header: "event",
    accessor: "name",
  },
  {
    Header: "points",
    accessor: "points",
    Cell: ({ row, value }) => {
      return parseInt(value);
    },
  },
];

export const DETAIL_COLUMNS = [
  {
    Header: "event",
    accessor: "name",
  },
  {
    Header: "date",
    accessor: "journal_event_timestamp",
    Cell: ({ row, value }) => {
      let date = new Date(value.replace(' ', 'T')).toLocaleDateString(
            "en-US", {month:'long', 'year':'numeric', 'day': 'numeric'});
      return `${date}`;
    },
  },
  {
    Header: "points",
    accessor: "amount",
  },
];
