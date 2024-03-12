import {toCurrency} from '@/shared/helpers'

export const MONIES_AVAILABLE_POSTINGS_COLUMNS = [
    {
        Header: "Transaction Type",
        accessor: "event_name",
        Cell: ({ row, value }) => {
            if(value) return value
            if( row.original?.journal_event_type ) return row.original.journal_event_type;
            return 'unknown'
            // console.log(value)
            // return `${value}`
        },
    },
    {
        Header: "Date",
        accessor: "created_at",
        Cell: ({ value }) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        },
        sortType: "datetime",
        sortDescFirst: true,
    },
    {
        Header: "Amount",
        accessor: "posting_amount",
        Cell: ({ row, value }) => {return toCurrency(value)},
    }
]