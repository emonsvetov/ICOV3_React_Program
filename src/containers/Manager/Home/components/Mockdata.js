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

export const LEADERBOARD_COLUMNS = [
    {
        Header: "Rank",
        accessor: "ranking",
    },
    {
        Header: "Participant",
        accessor: "display_name",
    },
]

export const LEADERBOARD_DATA =[
    {
        id: 21,
        data: [
            {
                rank: 1,
                name: "Jay Moore",
                award: 1,
            }
        ],
    },
    {
        id: 28,
        data: [
            {
                rank: 1,
                name: "Jay Moore",
                award: 100,
            },
            {
                rank: 2,
                name: "Elizabeth",
                award: 50,
            },
            {
                rank: 3,
                name: "Robert",
                award: 20,
            },

        ],
    },
             
]

export const AWARD_HISTORY_COLUMNS = [
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
        Header: "To",
        accessor: "to",
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
        Cell: ({ row, value }) => { return `${parseFloat(value).toFixed(0)}`},
    },
    {
        Header: "Dollar Value",
        accessor: "dollar_value",
        Cell: ({ row, value }) => { return `$${parseFloat(value).toFixed(2)}`},
    },
]

export const AWARD_HISTORY_DATA =[
    {
        event: "Test Event",
        award_level: "default",
        date: '12/02/2021',
        to: "Jay Moore",
        from: "Incentco Golobal Solutions",
        referrer: '',
        notes: "some notes",
        value: 0,
        dollar_value: 100,
    },             
]

export const REWARD_DATA = [
    {
        "name": "QA2 AQ2",
        "event":"Great job",
        "template":"Thanks for all of your hard work this year. Please enjoy a few bucks to go shopping and buy something nice for Greg and Gerry. Enjoy!",
        "from":"Oleg Ganshonkov",
        "timestamp" : "03/30/2022 21:41:57",
        "comments" :[
            {
                "from": "Rick Conner",
                "content": "Thank you so very much",
                "timestamp":"09/02/2021 02:25:25" 
            },
            {
                "from": "Rick Conner",
                "content": "Thank you so very much",
                "timestamp":"09/02/2021 02:25:25" 
            }
            
        ]
    }
    
]