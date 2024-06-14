export const TABLE_COLUMNS = [
  {
    Header: "Program Name",
    accessor: "program_name",
  },
  {
    Header: "Requested by",
    accessor: "requested_by",
  },
  {
    Header: "Recipient",
    accessor: "recipient",
  },
  {
    Header: "Approved by",
    accessor: "approved_by",
  },
  {
    Header: "Event Name",
    accessor: "event_name",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Scheduled Date",
    accessor: "scheduled_date",
    Cell: ({ value }) => {
      let date = new Date(value).toISOString().slice(0, 10);
      return <span>{date}</span>;
    },
  },
  {
    Header: "Date Created",
    accessor: "created_date",
    Cell: ({ value }) => {
      let date = new Date(value).toISOString().slice(0, 10);
      return <span>{date}</span>;
    },
  },
  {
    Header: "Budgets Available",
    accessor: "budgets_available",
  },
];
