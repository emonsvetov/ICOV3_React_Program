import {format} from "date-fns";

const RenderActions = ({row}) => {
  return (
      <span>
          <a className='link' style={{cursor: 'pointer'}}>View</a>
      </span>
  )
}

export const TABLE_COLUMNS = [
    {
      Header: "Import Date",
      accessor: "created_at",
      Cell: ({ row, value }) => { return format(new Date(value), "MM/dd/yyyy")}
    },
    {
      Header: "File Name",
      accessor: "name",
    },
    {
      Header: "Actions",
      accessor: "action",
      Cell: ({ row, value }) => { return row.original?.file_exists ? <a href={`${process.env.REACT_APP_API_STORAGE_URL}/${row.original.path}`} target='blank'>view</a> : 'file not found'},
    }
    // {
    //   Header: "View",
    //   accessor: "name",
    // },
  // {
  //   Header: "Program Id",
  //   accessor: "program_id",
  // },
  // {
  //   Header: "Program Name",
  //   accessor: "program_name",
  // },
  // {
  //   Header: "External Id",
  //   accessor: "external_id",
  // },
  // {
  //   Header: "Org Id",
  //   accessor: "recipient_organization_uid",
  // },
  // {
  //   Header: "First Name",
  //   accessor: "recipient_first_name",
  // },
  // {
  //   Header: "Last Name",
  //   accessor: "recipient_last_name",
  // },
  // {
  //   Header: "Email",
  //   accessor: "recipient_email",
  // },
  // {
  //   Header: "Amount Awarded",
  //   accessor: "points_awarded",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Amount Redeemed",
  //   accessor: "points_redeemed",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Amount Expired",
  //   accessor: "points_expired",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Amount Reclaimed",
  //   accessor: "points_reclaimed",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Award Credit Reclaimed",
  //   accessor: "award_credit_points_reclaimed",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Current Balance",
  //   accessor: "points_balance",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Peer Points Allocated",
  //   accessor: "peer_rewards_earned",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Peer Points Given",
  //   accessor: "peer_rewards_given",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Peer Points Balance",
  //   accessor: "peer_balance",
  //   Cell: ({ row, value }) => { return toPoints(row.original.factor_valuation * value); },
  // },
  // {
  //   Header: "Anniversary",
  //   accessor: "anniversary",
  // },
  // {
  //   Header: "Birthday",
  //   accessor: "birth",
  // },
];
