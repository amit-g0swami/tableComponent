import React, { useState } from "react";
import { TableFilterForm } from "../tableFilterForm/TableFilterForm";
import { ShowFilters } from "../tableFilterForm/showFilters/ShowFilters";
import "../tableFilter.css";

export const TableFilter = ({ ...props }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const setAppliedFilterValues = (values) => {
    const appliedFilters = [];
    props.definedFilters.forEach((filter) => {
      const value = values[filter.name];
      if (value) {
        appliedFilters.push({ filter, value });
      }
    });
    props.setAppliedFilters(appliedFilters);
  };

  return (
    <div className="tableFilter__filterContainer">
      <button onClick={() => setIsFilterOpen((filterOpen) => !filterOpen)}>
        Filters
      </button>
      <button onClick={() => props.setAppliedFilters({})}>Clear Filters</button>
      <div>
        {isFilterOpen && (
          <div className="tableFilter__filter">
            <TableFilterForm getFormData={setAppliedFilterValues}>
              <div className="tableForm__header">
                <h4>Filters</h4>
                <button className="tableForm__button" type="submit">
                  Apply
                </button>
              </div>
              {props.definedFilters.map((filterData, index) => (
                <div key={index} className="tableForm__inputContainer">
                  <ShowFilters index={index} filterData={filterData} />
                </div>
              ))}
            </TableFilterForm>
          </div>
        )}
      </div>
    </div>
  );
};
