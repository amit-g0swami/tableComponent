import React from "react";

export const TableHeader = ({ ...props }) => {
  return (
    <thead>
      <tr>
        {props.column?.map((i) => (
          <td key={i.key}>{i.title}</td>
        ))}
      </tr>
    </thead>
  );
};
