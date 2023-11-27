import { toPoints} from '@/shared/helpers'
export const TABLE_COLUMNS = [
  {
    Header: "Program Name",
    accessor: "name",
  },
  {
    Header: "Beginning Balance",
    accessor: "startBalanceTotal",
    Cell: ({ row, value }) => { return value ? toPoints(value) : '-' },
  },
  {
    Header: "Total Deposits",
    accessor: "deposit",
    Cell: ({ row, value }) => { return value ? toPoints(value) : '-' },
  },
  {
    Header: "Total Reversal",
    accessor: "reversal",
    Cell: ({ row, value }) => { return value ? toPoints(value) : '-' },
  },
  {
    Header: "Transfer",
    accessor: "transfer",
    Cell: ({ row, value }) => { return value ? toPoints(value) : '-' },
  },
  {
    Header: "Total Awarded",
    accessor: "award",
    Cell: ({ row, value }) => { return value ? toPoints(value) : '-' },
  },
  {
    Header: "Total Reclaims",
    accessor: "reclaim",
    Cell: ({ row, value }) => { return value ? toPoints(value) : '-' },
  },
  {
    Header: "Ending Balance",
    accessor: "endBalanceTotal",
    Cell: ({ row, value }) => { return value ? toPoints(value) : '-' },
  },
];
