import React, { useContext, useEffect, useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { TableFilterFormContext } from "../TableFilterForm";
import "./filters.css";

export const TableMultipleInput = ({ filterData, index }) => {
  const { values, setValues } = useContext(TableFilterFormContext);
  const [selectedValues, setSelectedValues] = useState([]);
  const [open, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!open);
  };

  const handleChange = (event) => {
    const optionValue = event.target.value;
    if (selectedValues.includes(optionValue)) {
      setSelectedValues((prevSelectedValues) => {
        return prevSelectedValues.filter((value) => value !== optionValue);
      });
    } else {
      setSelectedValues((prevSelectedValues) => {
        return [...prevSelectedValues, optionValue];
      });
    }
  };

  useEffect(() => {
    setValues({ ...values, [filterData.name]: selectedValues.join(",") });
  }, [selectedValues]);

  return (
    <div>
      <div onClick={handleToggle} className="filterInput__Header">
        {open === false ? <BiChevronUp /> : <BiChevronDown />}
        {`Filter ${index + 1}`}
      </div>
      {open && (
        <div className="filterInput__filter">
          <h4>{filterData.displayName}</h4>
          {filterData.options.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                name={option.value}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={handleChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
