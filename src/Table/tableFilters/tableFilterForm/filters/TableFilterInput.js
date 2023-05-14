import React, { useContext, useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { TableFilterFormContext } from "../TableFilterForm";
import "./filters.css";

export const TableFilterInput = ({ filterData, index }) => {
  const { values, setValues } = useContext(TableFilterFormContext);
  const [open, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!open);
  };
  const handleChange = (e) => {
    setValues({ ...values, [filterData.name]: e.target.value });
  };
  return (
    <div>
      <div onClick={handleToggle} className="filterInput__Header">
        {open === false ? <BiChevronUp /> : <BiChevronDown />}
        {`Filter ${index + 1}`}
      </div>
      {open && (
        <div className="filterInput__filter">
          <h4>{filterData.displayName}</h4>
          <input
            type={filterData?.type}
            name={filterData?.name}
            onChange={(e) => handleChange(e)}
            value={values[filterData.name] || ""}
            className="filterInput__inputField"
          />
        </div>
      )}
    </div>
  );
};
