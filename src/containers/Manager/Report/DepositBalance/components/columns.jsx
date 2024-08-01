import { toCurrency} from '@/shared/helpers'
import AddIcon from 'mdi-react/AddIcon';
import MinusIcon from 'mdi-react/MinusIcon';

export const TABLE_COLUMNS = [
  {
    // Build our expander column
    id: 'expander', // Make sure it has an ID
    Header: ({getToggleAllRowsExpandedProps, isAllRowsExpanded}) => (
      <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '' : ''}
          </span>
    ),
    Cell: ({row}) =>
      // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
      // to build the toggle for expanding a row
      row.canExpand ? (
        <span
          {...row.getToggleRowExpandedProps({
            style: {
              // We can even use the row.depth property
              // and paddingLeft to indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
            },
          })}
        >
              {row.isExpanded ? <MinusIcon className="chevron-expand"/> : <AddIcon className="chevron-expand"/>}
            </span>
      ) : null,
    width: 125
  },
  {
    Header: "Program Name",
    accessor: "name",
  },
  {
    Header: "Beginning Balance",
    accessor: "startBalanceTotal",
    Cell: ({ row, value }) => { return value ? toCurrency(value) : 0 },
  },
  {
    Header: "Total Deposits",
    accessor: "deposit",
    Cell: ({ row, value }) => { return value ? toCurrency(value) : '-' },
  },
  {
    Header: "Total Reversal",
    accessor: "reversal",
    Cell: ({ row, value }) => { return value ? toCurrency(value) : '-' },
  },
  {
    Header: "Transfer",
    accessor: "transfer",
    Cell: ({ row, value }) => { return value ? toCurrency(value) : '0' },
  },
  {
    Header: "Total Awarded",
    accessor: "award",
    Cell: ({ row, value }) => { return value ? toCurrency(value) : '-' },
  },
  {
    Header: "Total Reclaims",
    accessor: "reclaim",
    Cell: ({ row, value }) => { return value ? toCurrency(value) : '-' },
  },
  {
    Header: "Ending Balance",
    accessor: "endBalanceTotal",
    Cell: ({ row, value }) => { return value ? toCurrency(value) : 0 },
  },
];
