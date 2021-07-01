import React, { useState } from "react";
import TableForm from "./TableForm";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../Errors/ErrorAlert";

function NewTable() {
  const [newTableData, setNewTableData] = useState({
    table_name: "",
    capacity: "",
  });
  const history = useHistory();
  const [errors, setErrors] = useState(null);

  const changeHandler = (e) => {
    e.preventDefault();
    setNewTableData({ ...newTableData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      await createTable(newTableData, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      if (error.name === "AbortController") {
        console.log("Aborted");
      } else {
        setErrors(error);
      }
    }
    return () => abortController.abort();
  };

  const cancelHandler = () => {
    history.goBack();
  };


  return (
    <div>
      <ErrorAlert error={errors} />
      <TableForm
        changeHandler={changeHandler}
        newTableData={newTableData}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </div>
  );
}

export default NewTable;
