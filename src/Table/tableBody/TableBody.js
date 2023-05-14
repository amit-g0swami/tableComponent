import React from "react";

export const TableBody = ({ ...props }) => {
  return (
    <tbody>
      {props.rows?.map((row) => (
        <tr key={row.id.toString()}>
          {props.column.map((col) => (
            <td key={`${col.key}-${row.id}`}>{row[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
