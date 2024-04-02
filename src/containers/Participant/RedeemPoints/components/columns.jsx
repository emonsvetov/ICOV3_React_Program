export const CART_COLUMNS = [
  {
    Header: "merchant",
    accessor: "logo",
    Cell: ({ row, value }) => {
      return <img src={value} alt="logo" />;
    },
  },
  {
    Header: "",
    accessor: "name",
  },
  {
    Header: "gift_code_value",
    accessor: "giftCode",
  },
  {
    Header: "quantity",
    accessor: "quantity",
  },
  {
    Header: "unit_price",
    accessor: "price",
    Cell: ({ row, value }) => {
      return `${value}`;
    },
  },
  {
    Header: "total",
    accessor: "total",
    Cell: ({ row, value }) => {
      return `${value.toLocaleString()}`;
    },
  },
];