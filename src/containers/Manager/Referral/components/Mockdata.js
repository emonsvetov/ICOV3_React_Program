export const REFERRAL_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
        Cell: ({ row, value }) => {return `${row.original.referral_notification_recipient_name} ${row.original.referral_notification_recipient_lastname}`},
    },
    {
        Header: "Email Address",
        accessor: "referral_notification_recipient_email",
    },
    {
        Header: "Status",
        accessor: "referral_notification_recipient_active",
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