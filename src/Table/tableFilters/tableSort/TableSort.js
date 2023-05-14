import React, { useState } from "react";
import { GrAscend, GrDescend } from "react-icons/gr";
import "../tableFilter.css";

export const TableSort = ({ ...props }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortInputChange = (name, direction) => {
    props.setAppliedSorts((prevValues) => {
      const newValues = {};
      if (direction) {
        newValues[name] = direction;
      }
      return newValues;
    });
    setIsSortOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setIsSortOpen((sortOpen) => !sortOpen)}>
          Sorts
        </button>
        <button onClick={() => props.setAppliedSorts({})}>Clear Sorts</button>
      </div>
      {isSortOpen && (
        <div className="tableFilter__sort">
          {props.definedSorts.map((sort) => (
            <div key={sort.name} className="tableFilter__sortInputs">
              <div style={{ width: "130px" }}>
                <input
                  type="radio"
                  checked={!!props.appliedSorts[sort.name]}
                  onChange={(e) =>
                    handleSortInputChange(
                      sort.name,
                      e.target.checked ? "asc" : undefined
                    )
                  }
                />
                {sort.displayName}
              </div>
              {!!props.appliedSorts[sort.name] && (
                <div
                  onClick={() =>
                    handleSortInputChange(
                      sort.name,
                      props.appliedSorts[sort.name] === "asc" ? "desc" : "asc"
                    )
                  }
                  className="tableFilter__toggle"
                >
                  {props.appliedSorts[sort.name] === "asc" ? (
                    <GrAscend />
                  ) : (
                    <GrDescend />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
