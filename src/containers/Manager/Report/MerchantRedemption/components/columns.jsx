import {toCurrency, toPoints} from '@/shared/helpers'
export const TABLE_COLUMNS = [
  {
    Header: "Merchant",
    accessor: 'merchant_name',
    enableRowSpan: 1
  },
  {
    Header: "Jan",
    accessor: 'month1_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Feb",
    accessor: 'month2_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Mar",
    accessor: 'month3_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Apr",
    accessor: 'month4_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "May",
    accessor: 'month5_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Jun",
    accessor: 'month6_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Jul",
    accessor: 'month7_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Aug",
    accessor: 'month8_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Sep",
    accessor: 'month9_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Oct",
    accessor: 'month10_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Nov",
    accessor: 'month11_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "Dec",
    accessor: 'month12_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  },
  {
    Header: "YTD",
    accessor: 'month13_redemption_amount',
    Cell: ({ row, value }) => { return toCurrency(value); },
  }
];
