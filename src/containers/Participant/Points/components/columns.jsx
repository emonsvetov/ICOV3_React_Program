export const SUMMARY_COLUMNS = [
    {
        Header: "Event",
        accessor: "event",
    },
    {
        Header: "Points",
        accessor: "point",
        Cell: ({ row, value }) => { return value.toLocaleString()}
    }
]

export const DETAIL_COLUMNS = [
    {
        Header: "",
        accessor: "icon",

    },
    {
        Header: "Event",
        accessor: "event",
    },
    {
        Header: "Date",
        accessor: "date",
    },
    {
        Header: "Points",
        accessor: "point",
        Cell: ({ row, value }) => { return value.toLocaleString()}
    }
]