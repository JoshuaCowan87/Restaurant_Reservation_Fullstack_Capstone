

function TableForm ({cancelHandler, changeHandler, submitHandler, newTableData}) {


    return (
        <div>
             <form>
        <div>
          <label className="form-label">Table Name</label>
          <input
          className="form-control"
            id="table_name"
            type="text"
            name="table_name"
            onChange={changeHandler}
            value={newTableData.table_name}
            required
          />
        </div>
        <div>
            <label className="form-label">Capacity</label>
            <input 
            className="form-control form-label"
            id="capacity"
            type="number"
            name="capacity"
            onChange={changeHandler}
            value={newTableData.capacity}
            required/>
        </div>
      </form>
      <button onClick={submitHandler} type="submit" className="btn-primary m-1">Submit</button>
      <button onClick={cancelHandler} type="button" style={{margin:"10px"}}>Cancel</button>
        </div>
    )
}

export default TableForm;