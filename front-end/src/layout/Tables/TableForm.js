

function TableForm ({cancelHandler, changeHandler, submitHandler, newTableData}) {


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
      <button onClick={submitHandler} type="submit">Submit</button>
      <button onClick={cancelHandler} type="button">Cancel</button>
        </div>
    )
}

export default TableForm;