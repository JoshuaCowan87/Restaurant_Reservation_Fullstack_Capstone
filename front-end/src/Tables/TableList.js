import React from "react";



function TableList({ tables, setTables, finishHandler }) {

  const tableList = tables.map((table) => {
    return (
      <div className="card" key={table.table_id}>
        <div data-table-id-status={table.table_id}>
          {table.reservation_id ? "Occupied" : "Free"}

        </div>
        <div>
          <p>{table.table_name}</p>
          <p>{table.capacity}</p>
        </div>
        {table.reservation_id ?     <button data-table-id-finish={table.table_id} onClick={() => finishHandler(table)}>Finish</button> : null}
      </div>
    );
  });

  return (
    <div>
      <div>{tableList}</div>
    </div>
  );
}

export default TableList;
