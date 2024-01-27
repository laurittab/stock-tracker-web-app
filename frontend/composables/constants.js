export const createToast = (message, color) => {
  const toast = useToast();
  toast.add({
    title: "<b>Server response</b>",
    description: `<u>message</u>: ${message}`,
    timeout: 3500,
    color: color,
  });
};

export const columns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "symbol",
    label: "Symbol",
    sortable: true,
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "currency",
    label: "Currency",
    sortable: true,
  },
  {
    key: "comments",
    label: "Comments",
  },
  {
    key: "dividend",
    label: "Dividend Yield",
    sortable: true,
  },
  {
    key: "peg",
    label: "PEG Ratio",
    sortable: true,
  },
  {
    key: "eps",
    label: "EPS",
    sortable: true,
  },
  {
    key: "target_price",
    label: "Target Price",
    sortable: true,
  },
  {
    key: "bottom_price",
    label: "Bottom Price",
    sortable: true,
  },
  {
    key: "createdAt",
    label: "Date",
    sortable: true,
  },
  {
    key: "description",
    label: "Description",
  },
];
