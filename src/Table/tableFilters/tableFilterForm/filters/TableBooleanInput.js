import React, { useContext, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { TableFilterFormContext } from "../TableFilterForm";
import "./filters.css";

export const TableBooleanInput = ({ filterData, index }) => {
  const { values, setValues } = useContext(TableFilterFormContext);
  const [selectedValues, setSelectedValues] = useState([]);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const optionValue = event.target.value;
    if (selectedValues.includes(optionValue)) {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter((val) => val !== optionValue)
      );
    } else {
      setSelectedValues([optionValue]);
    }
  };

  useEffect(() => {
    setValues({ ...values, [filterData.name]: selectedValues[0] });
  }, [selectedValues]);

  return (
    <div>
      <div onClick={handleToggle} className="filterInput__Header">
        {open === false ? <BiChevronUp /> : <BiChevronDown />}
        {`Filter ${index + 1}`}
      </div>
      {open && (
        <div className="filterInput__filter">
          <label>
            <input
              type="radio"
              name={filterData.name}
              checked={selectedValues.includes("true")}
              onClick={handleChange}
              value="true"
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name={filterData.name}
              checked={selectedValues.includes("false")}
              onClick={handleChange}
              value="false"
            />
            False
          </label>
        </div>
      )}
    </div>
  );
};
