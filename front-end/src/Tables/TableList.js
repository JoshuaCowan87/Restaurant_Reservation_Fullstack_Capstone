import React from "react";

function TableList({ tables, setTables, finishHandler }) {
  const tableList = tables.map((table) => {
    return (
      <div className="row">
     <div className="col-sm-6" key={table.table_id}>
      <div className="card text-white bg-secondary mb-3">
      <h5 className="table-card-title">Table: {table.table_name}</h5>
        <div>
        <h5 data-table-id-status={table.table_id}> Status:
          {table.reservation_id ? "Occupied" : "Free"}
        </h5>
          <h5>Capacity: {table.capacity}</h5>
        </div>
        {table.reservation_id ? (
          <div>
          <button
            data-table-id-finish={table.table_id}
            className="btn btn-success"
            onClick={() => finishHandler(table)}
          >
            Finish
          </button>
          </div>
        ) : null}
        </div>
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
