export const CART_COLUMNS = [
  {
    Header: "Merchant",
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
    Header: "Gift Code Value",
    accessor: "giftCode",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Unit Price",
    accessor: "price",
    Cell: ({ row, value }) => {
      return `${value} Points`;
    },
  },
  {
    Header: "Total",
    accessor: "total",
    Cell: ({ row, value }) => {
      return `${value.toLocaleString()} Points`;
    },
  },
];

export const CHECKOUT_COLUMNS = [
  {
    Header: "Merchant",
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
    Header: "Gift Code Value",
    accessor: "giftCode",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Unit Price",
    accessor: "price",
    Cell: ({ row, value }) => {
      return `${value} Points`;
    },
  },
  {
    Header: "Total",
    accessor: "total",
    Cell: ({ row, value }) => {
      return `${value.toLocaleString()} Points`;
    },
  },
];
