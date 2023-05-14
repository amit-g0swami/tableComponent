import React from "react";
import { TableFilter } from "./tableFilter/TableFilter";
import { TableSort } from "./tableSort/TableSort";

export const TableFilters = ({ ...props }) => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <TableSort
        definedSorts={props.definedSorts}
        appliedSorts={props.appliedSorts}
        setAppliedSorts={props.setAppliedSorts}
      />
      <TableFilter
        definedFilters={props.definedFilters}
        appliedFilters={props.appliedFilters}
        setAppliedFilters={props.setAppliedFilters}
      />
    </div>
  );
};
