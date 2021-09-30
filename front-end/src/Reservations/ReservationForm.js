import React from "react";
import { useHistory } from "react-router";


function ReservationForm({changeHandler, submitHandler, reservationData}) {
  const history = useHistory();
  return (
    <div>
      
      <form>
        <div>
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            id="first_name"
            className="form-control"
            type="text"
            name="first_name"
            onChange={changeHandler}
            value={reservationData.first_name}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            id="last_name"
            className="form-control"
            type="text"
            name="last_name"
            onChange={changeHandler}
            value={reservationData.last_name}
            required
          />
        </div>

        <div>
          <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
          <input
            id="mobileNumber"
            className="form-control"
            type="tel"
            name="mobile_number"
            onChange={changeHandler}
            value={reservationData.mobile_number}
            required
          />
        </div>

        <div>
          <label htmlFor="reservation_date"className="form-label" >Date of Reservation</label>
          <input
            id="date"
            className="form-control"
            type="date"
            name="reservation_date"
            onChange={changeHandler}
            value={reservationData.reservation_date}
            required
          />
        </div>

        <div>
          <label htmlFor="reservation_time" className="form-label">Time of Reservation</label>
          <input
            id="time"
            className="form-control"
            type="time"
            name="reservation_time"
            onChange={changeHandler}
            value={reservationData.reservation_time}
            required
          />
        </div>

        <div>
          <label htmlFor="people" className="form-label">Number of People in Party</label>
          <input
            id="people"
            type="number"
            className="form-control"
            name="people"
            onChange={changeHandler}
            value={reservationData.people}
            required
          />
        </div>
        <button onClick={submitHandler} type="submit" className="btn-primary m-1">
          Submit
        </button>
        <button onClick={() => history.push("/dashboard")} type="button" style={{margin:"10px"}} >Cancel</button>
      </form>
    </div>
  );
}

export default ReservationForm;
