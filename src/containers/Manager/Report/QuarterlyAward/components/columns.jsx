import { toPoints} from '@/shared/helpers'
const Q1_columns = [
  {
      Header: 'Value',
      accessor: 'val_q1',
    },
    {
      Header: 'Count',
      accessor: 'cnt_q1',
    }
]
const Q2_columns = [
    {
        Header: 'Value',
        accessor: 'val_q2',
      },
      {
        Header: 'Count',
        accessor: 'cnt_q2',
      }
  ]
    const Q3_columns = [
    {
        Header: 'Value',
        accessor: 'val_q3',
        },
        {
        Header: 'Count',
        accessor: 'cnt_q3',
        }
    ]
    const Q4_columns = [
    {
        Header: 'Value',
        accessor: 'val_q4',
        },
        {
        Header: 'Count',
        accessor: 'cnt_q4',
        }
    ]

const year_columns = [
    {
        Header: 'Value',
        accessor: 'value',
        Cell: ({ row, value }) => { return `$${parseFloat(value).toFixed(2)}`},
    },
    {
        Header: 'Count',
        accessor: 'count',
    }
]
export const TABLE_COLUMNS = [
  {
      Header: "Event",
      accessor: 'event',
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
  {
      Header: "As of 2022", //need to be fixed
      columns: year_columns
  },
];

