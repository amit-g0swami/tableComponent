import React from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import "./tableFooter.css";

export const TableFooter = ({ page, setPage, pageLimit, setPageLimit }) => {
  const rowsPerPageOptions = [10, 20, 30];
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setPageLimit(selectedValue);
  };
  const handlePageChange = (type) => {
    setPage((prevPage) => {
      let newPage;
      if (type === "i") {
        newPage = prevPage + 1;
      } else {
        newPage = prevPage === 1 ? prevPage : prevPage - 1;
      }
      return newPage;
    });
  };
  return (
    <div className="pagination">
      <div className="pagination__rows">
        View
        <select value={pageLimit} onChange={handleOptionChange}>
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        per page
      </div>
      <div className="pagination__lastDiv">
        <div className="pagination__page">
          Page
          <div
            onClick={() => handlePageChange("d")}
            style={{ cursor: "pointer" }}
          >
            <GrPrevious />
          </div>
          <div className="pagination__count">{page}</div>
          <div
            onClick={() => handlePageChange("i")}
            style={{ cursor: "pointer" }}
          >
            <GrNext />
          </div>
          of 10,000 pages
        </div>
      </div>
    </div>
  );
};
