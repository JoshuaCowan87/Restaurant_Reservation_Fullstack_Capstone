import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationError from "./ReservationError";

function ReservationForm() {
  const history = useHistory();
  //const [reservationError, setReservationError] = useState([])
  const reservationErrors = []
  const [newReservationData, setNewReservationData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
 

  const changeHandler = (e) => {
    e.preventDefault();    

if (e.target.name === "reservation_date") {       //reservation must be in the future
  const date = new Date(e.target.value);
  const today = new Date();
  if (today > date) {
    reservationErrors.push("Reservation Date Must Be In The Future")
  }
  console.log("today", today, date)
}

if (e.target.name === "reservation_date") {       //reservation cannot be on a tuesday
  const date = new Date(e.target.value);
  const day = date.getUTCDay();
  if (day === 2) {
    reservationErrors.push("Restaurant is Closed on Tuesdays")
  }
}

if (e.target.name === "reservation_time") {       //reservation must be between 1030am and 930pm
 if (e.target.value < 1030 || e.target.value > 2130) {
   reservationErrors.push("Reservations must be between 1030am and 930pm")
 }
}



    setNewReservationData({ ...newReservationData, [e.target.name]: e.target.value });
  };

  function submitHandler(e) {
      // chain .then after createReservation
   createReservation(newReservationData)
    history.push(`/dashboard/${newReservationData.reservation_date}`);
  }

  function cancelHandler(e) {
    history.push("/dashboard");
  }


  return (
    <div>
      { <ReservationError reservationErrors={reservationErrors}/>}
      <form>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            className="form-control"
            type="text"
            name="first_name"
            onChange={changeHandler}
            value={newReservationData.first_name}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            className="form-control"
            type="text"
            name="last_name"
            onChange={changeHandler}
            value={newReservationData.last_name}
            required
          />
        </div>

        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            id="mobileNumber"
            className="form-control"
            type="tel"
            name="mobile_number"
            onChange={changeHandler}
            value={newReservationData.mobile_number}
            required
          />
        </div>

        <div>
          <label htmlFor="reservation_date">Date of Reservation</label>
          <input
            id="date"
            className="form-control"
            type="date"
            name="reservation_date"
            onChange={changeHandler}
            value={newReservationData.reservation_date}
            required
          />
        </div>

        <div>
          <label htmlFor="reservation_time">Time of Reservation</label>
          <input
            id="time"
            className="form-control"
            type="time"
            name="reservation_time"
            onChange={changeHandler}
            value={newReservationData.reservation_time}
            required
          />
        </div>

        <div>
          <label htmlFor="people">Number of People in Party</label>
          <input
            id="people"
            type="number"
            className="form-control"
            name="people"
            onChange={changeHandler}
            value={newReservationData.people}
            required
          />
        </div>
        <button onClick={submitHandler} type="button">
          Submit
        </button>
        <button onClick={cancelHandler} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
