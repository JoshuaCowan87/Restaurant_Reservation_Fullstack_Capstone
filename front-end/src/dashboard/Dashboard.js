import React, { useEffect, useState } from "react";
import {reservationByDate } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../layout/ReservationList";
import { useHistory, Link, useRouteMatch} from "react-router-dom";
import {previous, next, today} from "../utils/date-time"



/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date, setDate}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory ();
const url = useRouteMatch();


  useEffect(loadDashboard, [date, url]);
  
  function loadDashboard() {
    const reservation_date = date;
    console.log("date", typeof date, date)
    console.log("res", typeof reservation_date, reservation_date)
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


 
// form input to change the date to show ReservationsList
/*
const dateChangeHandler = ({ target }) => {
  const newDate = target.value;
  history.push(`/dashboard?date=${newDate}`);
}

const dateInput = (date) => {
  return (
    <form className="form-group">
      <label htmlFor="reservation_date" />
      <input
        className="form-control"
        type="date"
        id="reservation_date"
        name="reservation_date"
        value={date}
        onChange={dateChangeHandler}
        required
      />
    </form>
  );
};
*/