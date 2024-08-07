import {toCurrency,showPercentage} from '@/shared/helpers'
export const TODAY_DATA =[
    {
        title: "Today's Awards",
        today: {
                value: 300,
                unit: "Points",
                award: 0,
                awardText:"Awards"
            },
        ytd: {
            value: 32600,
            amount: 815,
        },
        mtd: {
            value: 0,
            amount: 0,
        }
    },
    {
        title: "Today's Redemptions",
        today: {
                value: 300,
                unit: "Points",
                award: 0,
                awardText:"Awards"
            },
        ytd: {
            value: 6600,
            amount: 815,
        },
        mtd: {
            value: 0,
            amount: 0,
        }
    },
    {
        title: "Today's Active Participants",
        today: {
                value: 2558,
                unit: "Active",
                award: "",
                awardText:""
            },
        ytd: {
            value: 1582,
            
            
        },
        mtd: {
            value: 5874,
            
        }
    },
]

export const TOP_MERCHANTS = [
    "Bobrowski, Robert",
    "Bradley, Megha",
    "Conner, Rlck",
    "Bobrowski, Robert",
    "Bradley, Megha",
    "Conner, Rlck",
]

export const TOP_AWARDS = [
    {
        type: "Starbucks",
        value: 800
    },
    {
        type: "Starbucks",
        value: 1800
    },
    {
        type: "Starbucks",
        value: 24800
    },
    {
        type: "Starbucks",
        value: 250
    },
    {
        type: "Starbucks",
        value: 800
    },
    {
        type: "Starbucks",
        value: 1000
    }
]
const labels = ['Mar-05','Mar-06', 'Mar-07', 'Mar-08', 'Mar-09', 'Mar-10', 'Mar-11', 'Mar-12'];
export const CHART_DATA = [
    {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => Math.random() * 60),
            borderColor: '#26CE83',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      },
      {
        labels,
        datasets: [
          {
            label: 'Dataset 2',
            data: labels.map(() => Math.random() * 60),
            borderColor: '#573BFF',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      }
]

export const EVENTS_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Event Type",
        accessor: "type",
    }
]

export const EVEMTS_DATA =[
    {
        name: "Abrove and Beyond!!!",
        type:"Standard"
    },
    {
        name: "Clone test",
        type:"Standard"
    },
    {
        name: "Good job!",
        type:"Peer to Peer"
    },
    {
        name: "Abrove and Beyond!!!",
        type:"Standard"
    },
    {
        name: "Clone test",
        type:"Standard"
    },
    {
        name: "Good job!",
        type:"Peer to Peer"
    },
    {
        name: "Abrove and Beyond!!!",
        type:"Standard"
    },
    {
        name: "Clone test",
        type:"Standard"
    },
    {
        name: "Good job!",
        type:"Peer to Peer"
    },
    
]

export const USERS_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
       // Cell: ({ row, value }) => { return <Link to={`/program/view/${row.original.id}`}>{value}</Link>}
    },
    {
        Header: "Email Address",
        accessor: "email",
    },
    {
        Header: "Status",
        accessor: "status.status",
    },
    // {
    //     Header: "Points Earned",
    //     accessor: "totalPointsRewarded",
    // },

    {
        Header: "Award Level",
        accessor: "award_level",
    },

    {
        Header: "Point Balance",
        accessor: "pointBalance",
    },
    {
        Header: "Redeemed",
        accessor: "redeemedBalance",
    },
    {
        Header: "Peer Balance",
        accessor: "peerBalance",
    },
]

export const USERS_DATA =[
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

export const PARTICIPANT_GOALPLAN_COLUMNS = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Type",
        accessor: "type",
    },
    {
        Header: "State",
        accessor: "state",
    },
    {
        Header: "Date Begin",
        accessor: "date_begin",
    },
    {
        Header: "Date End",
        accessor: "date_end",
    },
    {
        Header: "Target",
        accessor: "target",
    },
    {
        Header: "Progress",
        accessor: "progress",
    },
]

export const PARTICIPANT_GOALPLAN_DATA =[
    {
        name: "Goal 1",
        type:"Sales",
        state:'Active',
        date_begin: '12/31/2022',
        date_end: '12/31/2023',
        target: '200',
        Progress:'progress'
    },
    {
        name: "Goal 1",
        type:"Sales",
        state:'Active',
        date_begin: '12/31/2022',
        date_end: '12/31/2023',
        target: '200',
        Progress:'progress'

    },
    {
        name: "Goal 1",
        type:"Sales",
        state:'Active',
        date_begin: '12/31/2022',
        date_end: '12/31/2023',
        target: '200',
        Progress:'progress'

    },
    {
        name: "Goal 1",
        type:"Sales",
        state:'Active',
        date_begin: '12/31/2022',
        date_end: '12/31/2023',
        target: '200',
        Progress:'progress'

    },
    {
        name: "Goal 1",
        type:"Sales",
        state:'Active',
        date_begin: '12/31/2022',
        date_end: '12/31/2023',
        target: '200',
        Progress:'progress'

    },
    
];
const setIconPath = (icon) => {
    const path = process.env.REACT_APP_API_STORAGE_URL + "/" + icon;
    return path;
  }
export const REWARD_HISTORY_COLUMNS = [
    {
        Header: "Event",
        accessor: "name",
    },
    {
        Header: "Notes",
        accessor: "notes",
    },
    {
        Header: "Restrictions",
        accessor: "restrictions",
    },
    {
        Header: "Referrer",
        accessor: "referrer",
    },
    {
        Header: "Date",
        accessor: "journal_event_timestamp",
        Cell: ({ row, value }) => {
          return `${new Date(value).toLocaleDateString("en-US", {})}`;
        },
    },
    {
        Header: "Reference Document",
        accessor: "",
    },
    {
        Header: "Points",
        accessor: "amount",
    },
    {
      Header: "",
      accessor: "icon",
      // align: "center",
      Cell: ({ row, value }) => (
          !value ? '' : <img height={50} src={setIconPath(value)} alt="icons" />
      ),
    }
  ];
  export const PEER_RECLAIM_DATA =[
    { 
        'awarded': '2023-02-03 07:51:44', 
        'event_name': 'Testttt',
        'amount': 200, 
        'id': 100, 
        'journal_event_id': 17 
    },
    { 
        'awarded': '2023-02-03 07:51:44', 
        'event_name': 'Test',
        'amount': 200, 
        'id': 100, 
        'journal_event_id': 26 
    },
    { 
        'awarded': '2023-02-03 07:51:44', 
        'event_name': 'Test',
        'amount': 200, 
        'id': 100, 
        'journal_event_id': 39
    },
    { 
        'awarded': '2023-02-03 07:51:44', 
        'event_name': 'Test',
        'amount': 200, 
        'id': 100, 
        'journal_event_id': 49 
    }, 
];
export const USER_GOALS_COLUMNS =[
    {
        Header: "Name",
        accessor: "plan_name",
    },
    {
        Header: "Type",
        accessor: "goal_plan_type_name",
    },
    {
        Header: "Status",
        accessor: "goal_state_name",
    },
    {
        Header: "Date Begin",
        accessor: "date_begin",
        Cell: ({ row, value }) => {
            return `${new Date(value).toLocaleDateString("en-US", {})}`;
          },
    },
    {
        Header: "Date End",
        accessor: "date_end",
        Cell: ({ row, value }) => {
            return `${new Date(value).toLocaleDateString("en-US", {})}`;
        },
    },
    {
        Header: "Target",
        accessor: "target_value",  
        Cell: ({ row, value }) => {
            return `${toCurrency(value)}`;
        },
    },
    {
        Header: "Progress",
        accessor: "calc_progress_percentage",
        Cell: ({ row, value }) => {
            return  <>${showPercentage(value)} <span style={{ fontWeight:'bold'}}>{row.original.iterations? `(${row.original.iterations})` :''}</span></>;
        }
    },
];