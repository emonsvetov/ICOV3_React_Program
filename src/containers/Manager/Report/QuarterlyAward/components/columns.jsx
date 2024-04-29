import { toPoints} from '@/shared/helpers'
const Q1_columns = [
  {
    Header: 'Value',
    accessor: 'Q1_value',
    Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
  },
  {
    Header: 'Count',
    accessor: 'Q1_count',
  }
]

const Q2_columns = [
  {
    Header: 'Value',
    accessor: 'Q2_value',
    Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
  },
  {
    Header: 'Count',
    accessor: 'Q2_count',
  }
]

const Q3_columns = [
  {
    Header: 'Value',
    accessor: 'Q3_value',
    Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
  },
  {
    Header: 'Count',
    accessor: 'Q3_count',
  }
]

const Q4_columns = [
  {
    Header: 'Value',
    accessor: 'Q4_value',
    Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
  },
  {
    Header: 'Count',
    accessor: 'Q4_count',
  }
]

export const TABLE_COLUMNS = [
  {
      Header: "Event",
      accessor: 'event_name',
      textAlign:'center'
  },
  {
      Header: "Q1",
      columns: Q1_columns,
  },
  {
      Header: "Q2",
      columns: Q2_columns
  },
  {
      Header: "Q3",
      columns: Q3_columns
  },
  {
      Header: "Q4",
      columns: Q4_columns
  },
  
];

