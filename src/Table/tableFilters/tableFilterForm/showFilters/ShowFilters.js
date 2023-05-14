import React from "react";
import { TableBooleanInput } from "../filters/TableBooleanInput";
import { TableFilterInput } from "../filters/TableFilterInput";
import { TableMultipleInput } from "../filters/TableMultipleInput";

export const ShowFilters = ({ index, filterData }) => {
  return (
    <div>
      {filterData.type === "string" && (
        <TableFilterInput index={index} filterData={filterData} />
      )}
      {filterData.type === "list_of_strings" && (
        <TableMultipleInput index={index} filterData={filterData} />
      )}
      {filterData.type === "boolean" && (
        <TableBooleanInput index={index} filterData={filterData} />
      )}
    </div>
  );
};
