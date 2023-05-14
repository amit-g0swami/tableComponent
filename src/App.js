import { TableComponent } from "./Table/TableComponent";
import { FilterType } from "./utils/types";

const column = [
  { title: "Id", key: "id" },
  { title: "Post Id", key: "postId" },
  { title: "Email", key: "email" },
  { title: "Name", key: "name" }
];

const definedFilters = [
  {
    name: "name",
    type: FilterType.STRING,
    displayName: "Name"
  },
  {
    name: "department",
    type: FilterType.LIST_OF_STRINGS,
    displayName: "Department",
    options: [
      { label: "Account", value: "account" },
      { label: "Customer Care", value: "customerCare" },
      { label: "Finance", value: "finance" }
    ]
  },
  {
    name: "status",
    type: FilterType.BOOLEAN,
    displayName: "Status"
  },
  {
    name: "email",
    type: FilterType.STRING,
    displayName: "Email"
  }
];

const definedSorts = [
  {
    name: "email",
    displayName: "Email"
  },
  {
    name: "name",
    displayName: "Name"
  },
  {
    name: "postId",
    displayName: "Post Id"
  }
];
const baseUrl = "https://jsonplaceholder.typicode.com/comments";

export default function App() {
  return (
    <TableComponent
      column={column}
      baseUrl={baseUrl}
      definedFilters={definedFilters}
      definedSorts={definedSorts}
    />
  );
}
