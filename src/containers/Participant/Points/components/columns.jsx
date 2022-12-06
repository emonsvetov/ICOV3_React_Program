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
        // align: "center",
        Cell: ({ row, value }) => <img src={value} alt={value} width="30px" height="30px" />
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