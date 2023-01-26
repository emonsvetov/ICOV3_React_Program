export const TEAM_COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Photo",
    accessor: "photo",
    Cell: ({ row, value }) => {
      return <img src={`${process.env.REACT_APP_API_STORAGE_URL}/${value}`} style={{ width: "30px" }} />;
    },
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Contact Phone",
    accessor: "contact_phone",
  },
  {
    Header: "Contact Email",
    accessor: "contact_email",
  },
];

const AVATAR_IMG = `${process.env.PUBLIC_URL}/new/img/avatar/avatar2.jpg`;
export const TEAM_DATA = [
  {
    id: 139,
    photo: AVATAR_IMG,
    name: "Robert Bobrowski",
    title: "The Lord of Bugs",
    description: "",
    phone: "+1(212)121-2121",
    email: "r.bobrowski@temp-neteos.pl",
  },
  {
    id: 139,
    photo: AVATAR_IMG,
    name: "Robert Bobrowski",
    title: "The Lord of Bugs",
    description: "",
    phone: "+1(212)121-2121",
    email: "r.bobrowski@temp-neteos.pl",
  },
  {
    id: 139,
    photo: AVATAR_IMG,
    name: "Robert Bobrowski",
    title: "The Lord of Bugs",
    description: "",
    phone: "+1(212)121-2121",
    email: "r.bobrowski@temp-neteos.pl",
  },
  {
    id: 139,
    photo: AVATAR_IMG,
    name: "Robert Bobrowski",
    title: "The Lord of Bugs",
    description: "",
    phone: "+1(212)121-2121",
    email: "r.bobrowski@temp-neteos.pl",
  },
  {
    id: 139,
    photo: AVATAR_IMG,
    name: "Robert Bobrowski",
    title: "The Lord of Bugs",
    description: "",
    phone: "+1(212)121-2121",
    email: "r.bobrowski@temp-neteos.pl",
  },
  {
    id: 139,
    photo: AVATAR_IMG,
    name: "Robert Bobrowski",
    title: "The Lord of Bugs",
    description: "",
    phone: "+1(212)121-2121",
    email: "r.bobrowski@temp-neteos.pl",
  },
];
