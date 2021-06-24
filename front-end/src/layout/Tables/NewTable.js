import React, {useState} from "react";
import TableForm from "./TableForm";
import {useHistory} from "react-router-dom";
import { createTable } from "../../utils/api";

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

const submitHandler = async (e) => {
e.preventDefault();
const abortController = new AbortController();
console.log("table submit hander")
try {
 await createTable(newTableData, abortController.signal)
 history.push("/dashboard")
} catch(error) {
  if (error.name === "AbortController") {
    console.log("Aborted")
  }
}

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
