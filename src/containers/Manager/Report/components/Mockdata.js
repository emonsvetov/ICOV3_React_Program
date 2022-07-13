export const INVOICES_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Email Address",
        accessor: "email",
    }
]

export const INVOICE_DATA =[
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    },
    {
        name: "Bobrowski, Robert",
        email:"r.bobrowski@temp-neteos.pl"
    }
       
]

export const PROGRAM_STATUS_COLUMNS = [
    {
        Header: "Program Name",
        accessor: "name",
    },
    {
        Header: "Total Participants",
        accessor: "total",
    },
    {
        Header: "New Participants",
        accessor: "new",
    },
    {
        Header: "Awards",
        accessor: "awards",
    },
    {
        Header: "Value",
        accessor: "value",
    },
    {
        Header: "Average",
        accessor: "average",
    },
    {
        Header: "MTD Awards",
        accessor: "mtd_awards",
    },
    {
        Header: "MTD Value",
        accessor: "mtd_value",
    },
    {
        Header: "MTD Average",
        accessor: "mtd_average",
    },
    {
        Header: "YTD Awards",
        accessor: "ytd_awards",
    },
    {
        Header: "YTD Value",
        accessor: "ytd_value",
    },
    {
        Header: "YTD Average",
        accessor: "ytd_average",
    }
]

export const PROGRAM_STATUS_DATA =[
    {
        name: "Incentco",
        total: 19,
        new: 0,
        awards: 0,
        value: 0,
        average: 0,
        mtd_awards: 0,
        mtd_value: 0,
        ytd_awards: 9,
        ytd_value: 825,
        ytd_average: 91.67
    },
          
]

export const DEPOSIT_TRANSFER_COLUMNS = [
    {
        Header: "Date",
        accessor: "date",
    },
    {
        Header: "From Program",
        accessor: "from",
    },
    {
        Header: "To Program",
        accessor: "to",
    },
    {
        Header: "Transferred By",
        accessor: "by",
    },
    {
        Header: "Amount",
        accessor: "amount",
    }
]

export const DEPOSIT_TRANSFER_DATA =[
    {
        date: "01/04/2022",
        from: "Bobrowski, Robert",
        to: "Bobrowski, Robert",
        by: "Bobrowski, Robert",
        amount: 3500
    }
          
]

export const DEPOSIT_BALANCE_COLUMNS = [
    {
        Header: "Program Name",
        accessor: "name",
    },
    {
        Header: "Beginning Balance",
        accessor: "beginning",
    },
    {
        Header: "Total Deposits",
        accessor: "total",
    },
    {
        Header: "Total Reversal",
        accessor: "reversal",
    },
    {
        Header: "Transfer",
        accessor: "transfer",
    },
    {
        Header: "Total Awarded",
        accessor: "awarded",
    },
    {
        Header: "Total Reclaims",
        accessor: "reclaim",
    }, 
    {
        Header: "Ending Balance",
        accessor: "ending",
    }
]

export const DEPOSIT_BALANCE_DATA =[
    {
        name: "Incentco",
        beginning: 0,
        total: 0,
        reversal: 0,
        transfer: 0,
        awarded: 0,
        reclaim: 0,
        ending: 0
    },
          
]

export const PARTICIPANT_STATUS_COLUMNS = [
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Count",
        accessor: "count",
    },
    {
        Header: "Unique Count",
        accessor: "unique",
    }
]

export const PARTICIPANT_STATUS_DATA =[
    {
        status: "Pending Activation",
        count: 2,
        unique: 2
    },
    {
        status: "Active",
        count: 2,
        unique: 2
    },
    {
        status: "Deleted",
        count: 12,
        unique: 12
    },
    {
        status: "Deactivated",
        count: 20,
        unique: 20
    },
    {
        status: "Total Participants",
        count: 8,
        unique: 8
    }
          
]



export const PARTICIPANT_ACCOUNT_COLUMNS = [
    {
        Header: "ID",
        accessor: "id",
    },
    {
        Header: "External ID",
        accessor: "external_id",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "Last Name",
        accessor: "lName",
    },
    {
        Header: "First Name",
        accessor: "fName",
    },
    {
        Header: "Award Level",
        accessor: "award_level",
    },
    {
        Header: "Amount Awarded",
        accessor: "awarded",
    },
    {
        Header: "Amount Reclaimed",
        accessor: "reclaimed",
    },
    {
        Header: "Current Balance",
        accessor: "current",
    },
    {
        Header: "Peer Points Allocated",
        accessor: "allocated",
    },
    {
        Header: "Peer Points Given",
        accessor: "given",
    },
    {
        Header: "Peer Points To Award",
        accessor: "toAward",
    }
]

export const PARTICIPANT_ACCOUNT_DATA =[
    {
        id: "547658",
        exteral_id: "",
        email: "r.bobrowski@temp-neteos.pl",
        lName: "Bobrowski",
        fName: "Robert",
        award_level: "default",
        awarded: 0,
        reclaimed: 0,
        current: 1820,
        allocated: 825,
        given: 9,
        toAward: 0
    },
          
]

const Q1_columns = [
  {
      Header: 'Value',
      accessor: 'val_q1',
    },
    {
      Header: 'Count',
      accessor: 'cnt_q1',
    }
]
const Q2_columns = [
    {
        Header: 'Value',
        accessor: 'val_q2',
      },
      {
        Header: 'Count',
        accessor: 'cnt_q2',
      }
  ]
    const Q3_columns = [
    {
        Header: 'Value',
        accessor: 'val_q3',
        },
        {
        Header: 'Count',
        accessor: 'cnt_q3',
        }
    ]
    const Q4_columns = [
    {
        Header: 'Value',
        accessor: 'val_q4',
        },
        {
        Header: 'Count',
        accessor: 'cnt_q4',
        }
    ]

const year_columns = [
    {
        Header: 'Value',
        accessor: 'value',
        Cell: ({ row, value }) => { return `$${parseFloat(value).toFixed(2)}`},
    },
    {
        Header: 'Count',
        accessor: 'count',
    }
]



export const QUARTERLY_AWARD_COLUMNS = [
    
    {
        Header: "Event",
        accessor: 'event',
        textAlign:'center'
    },
    {
        Header: "Q1",
        columns: Q1_columns,
    },
    {
        Header: "Q2",
        columns: Q2_columns
    },
    {
        Header: "Q3",
        columns: Q3_columns
    },
    {
        Header: "Q4",
        columns: Q4_columns
    },
    {
        Header: "As of 2022", //need to be fixed
        columns: year_columns
    },
]

export const QUARTERLY_AWARD_DATA =

[
    {"event" : "Happy Birthday" , "val_q1" : 10 , "val_q2": 8, "val_q3": 2, "val_q4" : 100, "value": 300, "cnt_q1": 0, "cnt_q2": 0, "cnt_q3": 0, "cnt_q4": 0, "count": 4},
        
]

export const MERCHANT_REDEMPTION_COLUMNS = [
    {
        Header: "",
        accessor: 'name',
    },
    {
        Header: "Jan",
        accessor: 'jan',
    },
    {
        Header: "Feb",
        accessor: 'feb',
    },
    {
        Header: "Mar",
        accessor: 'mar',
    },
    {
        Header: "Apr",
        accessor: 'apr',
    },
    {
        Header: "May",
        accessor: 'may',
    },
    {
        Header: "Jun",
        accessor: 'jun',
    },
    {
        Header: "Jul",
        accessor: 'jul',
    },
    {
        Header: "Aug",
        accessor: 'aug',
    },
    {
        Header: "Sep",
        accessor: 'sep',
    },
    {
        Header: "Oct",
        accessor: 'oct',
    },
    {
        Header: "Nov",
        accessor: 'nov',
    },
    {
        Header: "Dec",
        accessor: 'dec',
    },
    {
        Header: "YTD",
        accessor: 'ytd',
    },
]

export const MERCHANT_REDEMPTION_DATA =
[
    {"name" : "Red Robin" , "jan" : 10 , "feb": 8, "mar": 2, "apr" : 100, "may": 300, "jun": 0, "jul": 0, "aug": 0, "sep": 0, "oct": 4, "nov": 0, "dec": 0, "ytd": 50}, 
]


export const FILE_IMPORT_COLUMNS = [
    {
        Header: "Import Date",
        accessor: 'date',
    },
    {
        Header: "File Name",
        accessor: 'name',
    }
]

export const FILE_IMPORT_DATA =
[
    {"date":'01/19/2022', "name" : "123.csv"}, 
]

export const FILE_COLUMNS = [
    {
        Header: "ProgramID",
        accessor: 'id',
    },
    {
        Header: "First Name",
        accessor: 'fName',
    },
    {
        Header: "Last Name",
        accessor: 'lName',
    },
    {
        Header: "Email",
        accessor: 'email',
    },
    {
        Header: "Amount",
        accessor: 'amount',
    },
    {
        Header: "Message",
        accessor: 'message',
    },
    {
        Header: "Notes",
        accessor: 'notes',
    },
    {
        Header: "Errors",
        accessor: 'errors',
    }
]

export const FILE_DATA =
[
    {"id":'288308', "fName" : "Billy-7", "lName":"", "email":"billy7@temp-gmail.com", "amount":"", "message":"", "notes":"", "errors":"The LastName field is required., The Amount field must contain only numbers., A valid Amount is required to validate ProgramID."}, 
]

export const AWARD_SUMMARY_COLUMNS = [
    {
        Header: "",
        accessor: 'lName',
    },
    {
        Header: "",
        accessor: 'fName',
    },
    {
        Header: "Jan",
        accessor: 'jan',
    },
    {
        Header: "Feb",
        accessor: 'feb',
    },
    {
        Header: "Mar",
        accessor: 'mar',
    },
    {
        Header: "Apr",
        accessor: 'apr',
    },
    {
        Header: "May",
        accessor: 'may',
    },
    {
        Header: "Jun",
        accessor: 'jun',
    },
    {
        Header: "Jul",
        accessor: 'jul',
    },
    {
        Header: "Aug",
        accessor: 'aug',
    },
    {
        Header: "Sep",
        accessor: 'sep',
    },
    {
        Header: "Oct",
        accessor: 'oct',
    },
    {
        Header: "Nov",
        accessor: 'nov',
    },
    {
        Header: "Dec",
        accessor: 'dec',
    }
]

export const AWARD_SUMMARY_DATA =
[
    {"lName" : "Megha" ,"fName" : "Brasley", "jan" : 10 , "feb": 8, "mar": 2, "apr" : 100, "may": 300, "jun": 0, "jul": 0, "aug": 0, "sep": 0, "oct": 4, "nov": 0, "dec": 0}, 
]

export const AWARD_DETAIL_COLUMNS = [
    {
        Header: "Event",
        accessor: "event",
    },
    {
        Header: "Award Level",
        accessor: "award_level",
    },
    {
        Header: "Date",
        accessor: "date",
    },
    {
        Header: "External ID",
        accessor: "external_id",
    },
    {
        Header: "To",
        accessor: "to",
    },
    {
        Header: "Email",
        accessor: "email",
    },
    {
        Header: "From",
        accessor: "from",
    },
    {
        Header: "Referrer",
        accessor: "referrer",
    },
    {
        Header: "Notes",
        accessor: "notes",
    },
    {
        Header: "Value",
        accessor: "value",
    },
    {
        Header: "Dollar Value",
        accessor: "dollar_value",
    }
]

export const AWARD_DETAIL_DATA =[
    
]