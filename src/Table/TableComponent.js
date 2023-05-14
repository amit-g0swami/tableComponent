import { useEffect, useState } from "react";
import axios from "axios";
import { TableFilters } from "./tableFilters/TableFilters";
import { TableHeader } from "./tableHeader/TableHeader";
import { TableBody } from "./tableBody/TableBody";
import { TableFooter } from "./tableFooter/TableFooter";
import { FilterType } from "../utils/types";
import "./tableComponent.css";

export const TableComponent = ({ ...props }) => {
  const [queryString, setQueryString] = useState(props.baseUrl);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [appliedSorts, setAppliedSorts] = useState({});
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState("");

  async function fetchData(query) {
    try {
      const response = await axios.get(query);
      const data = response.data;
      return data;
    } catch (error) {
      return [];
    }
  }

  const buildQueryFunction = () => {
    let queryParams = [];
    let filterQuery = [];
    const queryFilterValues = [];
    if (appliedFilters && appliedFilters.length > 0) {
      appliedFilters.map((filter) => {
        let filterValue;
        switch (filter.filter.type) {
          case FilterType.STRING:
          case FilterType.NUMBER:
          case FilterType.DATE:
          case FilterType.DATETIME:
            filterValue = filter.value;
            break;
          case FilterType.BOOLEAN:
            filterValue = filter.value;
            break;
          case FilterType.REGEX:
            filterValue = `/${filter.value}/`;
            break;
          case FilterType.LIST_OF_STRINGS:
          case FilterType.LIST_OF_NUMBERS:
            const valuesArray = filter.value.split(",");
            valuesArray.sort();
            filterValue = valuesArray.join("|");
            break;
          case FilterType.NUMERIC_RANGE:
            const [min, max] = filter.value.split("-");
            filterValue = `${min}-${max}`;
            break;
          case FilterType.DATE_RANGE:
          case FilterType.DATETIME_RANGE:
            const [start, end] = filter.value.split(",");
            filterValue = `${start}-${end}`;
            break;
          default:
            filterValue = filter.value;
        }
        queryFilterValues.push({
          name: filter.filter.name,
          value: filterValue
        });
        return queryFilterValues;
      });

      queryFilterValues.sort((filter1, filter2) => {
        let f1 = filter1.name.toLowerCase(),
          f2 = filter2.name.toLowerCase();
        if (f1 < f2) {
          return -1;
        }
        if (f1 > f2) {
          return 1;
        }
        return 0;
      });
      queryFilterValues.forEach((e) => {
        filterQuery.push(`${e.name}:${e.value}`);
      });
      if (filterQuery) {
        queryParams.push(`filters=${filterQuery.join(",")}`);
      }
    }

    let sortQuery = "";
    if (appliedSorts) {
      const sortedObj = Object.fromEntries(Object.entries(appliedSorts).sort());
      for (const [key, value] of Object.entries(sortedObj)) {
        sortQuery += `${key}:${value},`;
      }
    }
    sortQuery = sortQuery.slice(0, -1);

    if (sortQuery) {
      queryParams.push(`sorts=${sortQuery}`);
    }

    if (page && page !== 1) {
      queryParams.push(`page=${page}`);
    }

    if (pageLimit) {
      queryParams.push(`limit=${pageLimit}`);
    }

    const newQueryString =
      queryParams.length > 0
        ? `${props.baseUrl}?${queryParams.join("&")}`
        : props.baseUrl;
    setQueryString(newQueryString);
    return newQueryString;
  };

  console.log(appliedFilters);

  useEffect(() => {
    buildQueryFunction();
    async function getData() {
      const fetchedData = await fetchData(queryString);
      setRows(fetchedData);
    }
    getData();
  }, [queryString, appliedFilters, appliedSorts, page, pageLimit]);

  return (
    <div>
      <p>{queryString}</p>
      <div>
        <TableFilters
          definedFilters={props.definedFilters}
          definedSorts={props.definedSorts}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          appliedSorts={appliedSorts}
          setAppliedSorts={setAppliedSorts}
        />
        <TableHeader column={props.column} />
        <TableBody rows={rows} column={props.column} />
        <TableFooter
          page={page}
          setPage={setPage}
          pageLimit={pageLimit}
          setPageLimit={setPageLimit}
        />
      </div>
    </div>
  );
};
