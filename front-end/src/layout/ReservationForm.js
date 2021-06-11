import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function ReservationForm() {
  const history = useHistory();
  const [newReservationData, setnewReservationData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
 

  const changeHandler = (e) => {
    e.preventDefault();
    setnewReservationData({ ...newReservationData, [e.target.name]: e.target.value });
  };

  function submitHandler(e) {
      // chain .then after createReservation
   createReservation(newReservationData)
    history.push("/dashboard");
  }

  function cancelHandler(e) {
    history.push("/dashboard");
  }


  return (
    <div>
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
        <button onCLick={cancelHandler} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
