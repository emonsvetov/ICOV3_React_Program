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
    },
    {
        Header: "Email Address",
        accessor: "email",
    },
    {
        Header: "Status",
        accessor: "status.status",
    }
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