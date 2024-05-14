import {toCurrency, toPoints} from '@/shared/helpers'
export const TABLE_COLUMNS = [
  {
    Header: "Event",
    accessor: "event_name",
  },
  {
    Header: "GL Code",
    accessor: "ledger_code",
  },
  {
    Header: "Date",
    accessor: "posting_timestamp",
  },
  {
    id: 'to',
    Header: () => (<div style={{textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: 6}}>To</div>),
    className: 'align-center',
    Footer: "",
    columns: [
      {
        Header: "First Name",
        accessor: "recipient_first_name",
        width: 100
      },
      {
        Header: "Last Name",
        accessor: "recipient_last_name",
        width: 100
      },
      {
        Header: "Email",
        accessor: "recipient_email",
      }
    ]
  },
  {
    Header: "From",
    accessor: data => (
      data.awarder_full
    ),
    width: 120
  },
  {
    Header: "Referrer",
    accessor: "referrer",
  },
  {
    Header: "Notes",
    accessor: "notes",
  },
  {
    Header: "Dollar Value",
    accessor: "dollar_value",
    Cell: ({ row, value }) => { return toCurrency(value); },
    width: 110
  },
];
