import React, {useState} from "react";

function NewTable() {
const [newTableData, setNewTableData] = useState({
    table_name: "",
    capacity: ""
})

const changeHandler = (e) => {
    setNewTableData(e.target.value)
}

  return (
    <div>
      <form>
        <div>
          <label>Table Name</label>
          <input
            id="table_name"
            type="text"
            name="table_name"
            onChange={changeHandler}
            value={newTableData.table_name}
            required
          />
        </div>
        <div>
            <label>Capacity</label>
            <input 
            id="capacity"
            type="number"
            name="capacity"
            onChange={changeHandler}
            value={newTableData.capacity}
            required/>
        </div>
      </form>
    </div>
  );
}

export default NewTable;
