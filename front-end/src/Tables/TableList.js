import React from "react";

function TableList({ tables, finishHandler }) {
  const tableList = tables.map((table) => {
    return (
     
     <div className="col-lg-4 col-xl-3 m-3 card table-card-title text-white bg-secondary" key={table.table_id} >
   
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
    
      
    );
  });

  return (
    
       <div className="row" >
    {tableList}
    </div>
  );
}

export default TableList;
