import { toPoints} from '@/shared/helpers'
export const TABLE_COLUMNS = [
  {
    Header: "External ID",
    accessor: "organization_id",
  },
  {
    Header: "Program",
    accessor: "program_name",
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Goal Plan",
    accessor: "goal_plan_name",
  },
  {
    Header: "Last Goal Progress Date",
    accessor: "created",
  },
  {
    Header: "Total Goal Progress Value",
    accessor: "progress_value",
  },
  // {
  //   Header: "Org Id",
  //   accessor: "recipient_organization_uid",
  // },
  // {
  //   Header: "Participant",
  //   accessor: "first_name",
  //   Cell: ({ row, value }) => { return row.original.last_name +" " +value; },
  // },
  
];
