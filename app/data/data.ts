const filters = [
  {
    id: 0,
    name: "Owners",
    key: "current_owners",
  },
  {
    id: 1,
    name: "Law Firms",
    key: "law_firms",
  },
  {
    id: 2,
    name: "Attorneys",
    key: "attorneys",
  },
];

// Status options for buttons
const statusOptions = [
  { name: "All", id: 1, color: "transparent" },
  { name: "Registered", id: 2, color: "green" },
  { name: "Pending", id: 3, color: "yellow" },
  { name: "Abandoned", id: 4, color: "red" },
  { name: "Others", id: 5, color: "blue" },
];

export { filters, statusOptions };
