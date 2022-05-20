export const REFERRAL_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
        Cell: ({ row, value }) => {return `${row.original.first_name} ${row.original.last_name}`},
    },
    {
        Header: "Email Address",
        accessor: "email",
    },
    {
        Header: "Status",
        accessor: "status",
    }
]

export const REFERRAL_DATA =[
    {
        first_name: "Bobrowski",
        last_name: "Robert",
        email:"r.bobrowski@temp-neteos.pl",
        status:"Active"
    },
    {
        first_name: "Bobrowski",
        last_name: "Robert",
        email:"r.bobrowski@temp-neteos.pl",
        status:"Active"
    },
    {
        first_name: "Bobrowski",
        last_name: "Robert",
        email:"r.bobrowski@temp-neteos.pl",
        status:"Active"
    },
    {
        first_name: "Bobrowski",
        last_name: "Robert",
        email:"r.bobrowski@temp-neteos.pl",
        status:"Active"
    },
    {
        first_name: "Bobrowski",
        last_name: "Robert",
        email:"r.bobrowski@temp-neteos.pl",
        status:"Active"
    },
    {
        first_name: "Bobrowski",
        last_name: "Robert",
        email:"r.bobrowski@temp-neteos.pl",
        status:"Active"
    },
    {
        first_name: "Bobrowski",
        last_name: "Robert",
        email:"r.bobrowski@temp-neteos.pl",
        status:"Active"
    },
    
]