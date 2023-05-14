import React, { useState } from "react";
export const TableFilterFormContext = React.createContext({});

export const TableFilterForm = ({ ...props }) => {
  const [values, setValues] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    props.getFormData(values);
  };
  return (
    <TableFilterFormContext.Provider value={{ values, setValues }}>
      <form className={props.className} onSubmit={handleSubmit} id={props.id}>
        {props.children}
      </form>
    </TableFilterFormContext.Provider>
  );
};
