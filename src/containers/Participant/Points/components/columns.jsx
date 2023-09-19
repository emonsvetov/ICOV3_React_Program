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
      let date = new Date(value.replace(' ', 'T')).toLocaleDateString(
            "en-US", {month:'long', 'year':'numeric', 'day': 'numeric'});
      return `${date}`;
    },
  },
  {
    Header: "Points",
    accessor: "amount",
  },
];
