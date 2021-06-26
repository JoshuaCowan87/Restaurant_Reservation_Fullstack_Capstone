import React, { useState } from "react";
import { listTables } from "../utils/api";

function TableList({ tables }) {
  const [isFree, setIsFree] = useState(true);

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
