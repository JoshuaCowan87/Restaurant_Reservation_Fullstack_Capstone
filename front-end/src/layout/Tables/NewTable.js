import React, {useState} from "react";
import TableForm from "./TableForm";
import {useHistory} from "react-router-dom";

function NewTable() {
const [newTableData, setNewTableData] = useState({
    table_name: "",
    capacity: ""
});
const [tables, setTables] = useState([])
const history = useHistory();

const changeHandler = (e) => {
  e.preventDefault();

    setNewTableData({...newTableData, [e.target.name]: e.target.value})
}

const submitHandler = (e) => {
//create table API
history.push("/dashboard")
}

const cancelHandler = () => {
history.goBack();
}

  return (
    <div>
     <TableForm changeHandler={changeHandler} newTableData={newTableData} submitHandler={submitHandler} cancelHandler={cancelHandler}/>
    </div>
  );
}

export default NewTable;
