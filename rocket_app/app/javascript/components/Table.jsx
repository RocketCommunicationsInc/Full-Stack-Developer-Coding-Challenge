// Library Imports
import React from "react";

// Local Imports

const Table = (props) => {
  const { data } = props;
  // debugger
  // get all column names (keys)
  const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];
  console.log(data);
  const rowValues = data.map((row) => {
    // debugger
    const rowData = Object.values(row);
    return (
      <tr key={rowData[0]}>
        {rowData.map(val => <td>{val}</td>)}
      </tr> 
    )
  }) 

  return (
    <table className="rux-table">
      <tr className="rux-table__column-head">
        {columnHeaders.map((header, i) => <th key={i}>{header}</th>)}
      </tr>
      {rowValues}
    </table>
  )
}

export default Table;