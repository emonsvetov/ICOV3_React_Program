import { toPoints} from '@/shared/helpers'
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
  },
  {
      Header: "Average",
      accessor: "transaction_fees",
  },
  {
      Header: "MTD Awards",
      accessor: "mtd_awards_count",
  },
  {
      Header: "MTD Value",
      accessor: "mtd_awards_value",
  },
  {
      Header: "MTD Average",
      accessor: "mtd_transaction_fees",
  },
  {
      Header: "YTD Awards",
      accessor: "ytd_awards_count",
  },
  {
      Header: "YTD Value",
      accessor: "ytd_awards_value",
  },
  {
      Header: "YTD Average",
      accessor: "ytd_transaction_fees",
  }
];
