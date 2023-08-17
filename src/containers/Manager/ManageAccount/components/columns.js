import {toCurrency} from '@/shared/helpers'
export const MONIES_AVAILABLE_POSTINGS_COLUMNS = [
    {
        Header: "Transaction Type",
        accessor: "name",
        Cell: ({ row, value }) => {return `Award`},
    },
    {
        Header: "Date",
        accessor: "created_at",
    },
    {
        Header: "Amount",
        accessor: "posting_amount",
        Cell: ({ row, value }) => {return toCurrency(value)},
    }
]