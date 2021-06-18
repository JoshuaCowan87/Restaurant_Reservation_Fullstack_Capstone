import React, { useEffect, useState } from "react";
import { reservationByDate } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import ReservationList from "../Reservations/ReservationList";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import { today } from "../utils/date-time";
import Tablelist from "./Tables/Tablelist"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([1]);
  // set date based of url parameters
  const { url } = useRouteMatch();
  const params = useParams();
  const newDate = params.date;
  useEffect(loadDate, [url, date, newDate, setDate]);
  function loadDate() {
    if (newDate) setDate(newDate);
  }

  useEffect(loadDashboard, [date, url]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    reservationByDate(date, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }



  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
        <Link to={`/dashboard/${previous(date)}`}>Previous</Link>
        <Link to={`/dashboard/${today()}`}>Today</Link>
        <Link to={`/dashboard/${next(date)}`}>Next</Link>
      </div>
      <ReservationList reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      <Tablelist tables={tables}/>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
