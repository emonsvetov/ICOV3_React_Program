export const TABLE_COLUMNS = [
    {
        Header: "Program Name",
        accessor: "name",
    },
    {
        Header: "Total Participants",
        accessor: "participants_count",
    },
    {
        Header: "New Participants",
        accessor: "new_participants_count",
    },
    {
        Header: "Awards",
        accessor: "awards_count",
    },
    {
        Header: "Value",
        accessor: "awards_value",
        Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
    },
    {
        Header: "Average",
        accessor: "transaction_fees",
        Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
    },
    {
        Header: "MTD Awards",
        accessor: "mtd_awards_count",
    },
    {
        Header: "MTD Value",
        accessor: "mtd_awards_value",
        Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
    },
    {
        Header: "MTD Average",
        accessor: "mtd_transaction_fees",
        Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
    },
    {
        Header: "YTD Awards",
        accessor: "ytd_awards_count",
    },
    {
        Header: "YTD Value",
        accessor: "ytd_awards_value",
        Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
    },
    {
        Header: "YTD Average",
        accessor: "ytd_transaction_fees",
        Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(2)}`},
    },   
]