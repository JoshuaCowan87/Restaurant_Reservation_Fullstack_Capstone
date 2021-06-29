import React, { useEffect, useState } from "react";
import { listTables, listReservations, finishTable } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import ReservationList from "../Reservations/ReservationList";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import TableList from "../Tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate}) {
  
  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState(null);
  const [tables, setTables] = useState([]);
  //const [tablesErrors, setTablesErrors] = useState(null)

  // set date based of url parameters
  const { url } = useRouteMatch();
  const params = useParams();
  const newDate = params.date;
  useEffect(loadDate, [url, date, setDate, newDate]);
  function loadDate() {
    if (newDate) setDate(newDate)
    else setDate(today())
  }

  useEffect(loadDashboard, [date, url]);

  function loadDashboard() {
    const abortController = new AbortController();
    setErrors(null);
    //setTablesErrors(null);
    listTables(abortController.signal)
      .then(setTables)
      //.catch(setTablesErrors);
    listReservations({date}, abortController.signal)
      .then(setReservations)
      .catch(setErrors);
    return () => abortController.abort();
  }


  const finishHandler = async (table) => {
    const abortController = new AbortController();
    try {
   if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) { 
     await finishTable(table.table_id, abortController.signal);
   }
  await loadDashboard();
    } catch (error) {
      if (errors.name === "AbortError") {
 //       console.log("aborted")
      }
      setErrors(error)
    }
   return () => abortController.abort()
}
  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
        <Link to={`/dashboard/${previous(date)}`}>Previous</Link>
        <Link to={`/dashboard/`}>Today</Link>
        <Link to={`/dashboard/${next(date)}`}>Next</Link>
      </div>
      <ErrorAlert error={errors} /> 
      <ReservationList reservations={reservations} />
      <TableList tables={tables} setTables={setTables} finishHandler={finishHandler}/> 
    </main>
  );
}

export default Dashboard;
