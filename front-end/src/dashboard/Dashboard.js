import React, { useEffect, useState } from "react";
import {reservationByDate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../layout/ReservationList";
import { useHistory, Link, useRouteMatch} from "react-router-dom";
import {previous, next} from "../utils/date-time"



/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date, setDate}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
 // const history = useHistory ();
const url = useRouteMatch();


  useEffect(loadDashboard, [date, url]);
  
  function loadDashboard() {
    const reservation_date = date;
    const abortController = new AbortController();
    setReservationsError(null);
    reservationByDate({date}, abortController.signal)
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
        <Link to={`/dashboard/`}>Today</Link>
        <Link to={`/dashboard/${next(date)}`}>Next</Link>
      </div>
      <ReservationList reservations={reservations}/>
      <ErrorAlert error={reservationsError} />
     {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;


