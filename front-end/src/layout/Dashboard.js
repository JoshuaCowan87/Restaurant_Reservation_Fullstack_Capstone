import React, { useEffect, useState } from "react";
import { listReservations, reservationByDate, listTables } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import ReservationList from "../Reservations/ReservationList";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import TableList from "./Tables/TableList"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesErrors, setTablesErrors] = useState(null)

  // set date based of url parameters
  const { url } = useRouteMatch();
  const params = useParams();
  const newDate = params.date;
  console.log("newDate", newDate)
  useEffect(loadDate, [url, date, setDate]);
  function loadDate() {
    if (newDate) setDate(newDate)
    else setDate(today())
  }

  useEffect(loadDashboard, [date, url]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesErrors(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesErrors);
    reservationByDate(date, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

console.log("tables", tables)

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
      <ReservationList reservations={reservations} />
      

     {/* need to debug reservations error "cannot read property "reservation_date" of undefined
     <ErrorAlert error={reservationsError} /> */}
      <TableList tables={tables}/> 
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
