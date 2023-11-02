import {toCurrency, toPoints} from '@/shared/helpers'
export const TABLE_COLUMNS = [
  {
    Header: "Program Name",
    accessor: 'program_name',
    enableRowSpan: 1
  },
  {
    Header: "Last Name",
    accessor: 'recipientLastName',
  },
  {
    Header: "First Name",
    accessor: 'recipientFirstName',
  },
  {
    Header: "Jan",
    accessor: 'month1_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Feb",
    accessor: 'month2_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Mar",
    accessor: 'month3_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Apr",
    accessor: 'month4_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "May",
    accessor: 'month5_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Jun",
    accessor: 'month6_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Jul",
    accessor: 'month7_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Aug",
    accessor: 'month8_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Sep",
    accessor: 'month9_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Oct",
    accessor: 'month10_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Nov",
    accessor: 'month11_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Dec",
    accessor: 'month12_value',
    Cell: ({ row, value }) => { return toCurrency(value); },
  }
];
