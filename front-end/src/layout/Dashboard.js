import React, { useEffect, useState } from "react";
import {
  listTables,
  listReservations,
  finishTable,
  updateReservationStatus,
} from "../utils/api";
import ErrorAlert from "../Errors/ErrorAlert";
import ReservationList from "../Reservations/ReservationList";
import { Link, useRouteMatch } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import TableList from "../Tables/TableList";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState(null);
  const [tables, setTables] = useState([]);

  // set date based of url query
  const  url  = useRouteMatch();
  const query = useQuery()
  useEffect(loadDate, [url, query, setDate]);
  
  function loadDate() {
    const newDate = query.get("date");
    if (newDate) setDate(newDate)
  }

  useEffect(loadDashboard, [date, url]);

  function loadDashboard() {
    const abortController = new AbortController();
    setErrors(null);
    listTables(abortController.signal).then(setTables);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setErrors);
    return () => abortController.abort();
  }

  // handler to finish reservation seating at table
  const finishHandler = async (table) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Is this table ready to seat new guests? This cannot be undone."
        )
      ) {
        await finishTable(table.table_id, abortController.signal);
        await loadDashboard();
      }
      await loadDashboard();
    } catch (error) {
      if (errors.name === "AbortError") {
        console.log("aborted");
      }
      setErrors(error);
    }
    return () => abortController.abort();
  };

  // handler to delete reservation
  const cancelHandler = async (id) => {
    const data = { status: "cancelled" };
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ) {
        await updateReservationStatus(data, id, abortController.signal);
        await loadDashboard();
      }
    } catch (error) {
      setErrors(error);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
        <Link to={`/dashboard?date=${previous(date)}`} className="btn btn-primary m-1">Previous</Link>{" "}
        <Link to={`/dashboard?date=${today()}`} className="btn btn-primary m-1">Today</Link>{" "}
        <Link to={`/dashboard?date=${next(date)}`} className="btn btn-primary m-1">Next</Link>
      </div>
      <br />
      <ErrorAlert error={errors} />
      <ReservationList
        reservations={reservations}
        cancelHandler={cancelHandler}
      />
      <h3 className="mb-0">Tables:</h3>
      <TableList
        tables={tables}
        setTables={setTables}
        finishHandler={finishHandler}
      />
    </main>
  );
}

export default Dashboard;
