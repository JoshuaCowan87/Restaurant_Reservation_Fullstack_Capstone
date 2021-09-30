import React, { useState } from "react";
import ReservationList from "../Reservations/ReservationList";
import { reservationByPhone } from "../utils/api";
import ErrorAlert from "../Errors/ErrorAlert";

function SearchByPhone() {
  const [searchNumber, setSearchNumber] = useState({
    mobile_number: "",
  });
  const [foundReservations, setFoundReservations] = useState([]);
  const [phoneError, setPhoneError] = useState(null);

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchNumber({ ...searchNumber, [e.target.name]: e.target.value });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      reservationByPhone(
        searchNumber.mobile_number,
        abortController.signal
      ).then(setFoundReservations);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted")
      }
      setPhoneError(error);
    }
    return () => abortController.abort();
  };

  return (
    <div className="search-main">
      <div className="search-header">
        <h2 style={{textAlign:"center"}}> Search</h2>
      
      <div>
        <form>
          <label>Search by phone number</label>
          <input
            id="searchNumber"
            name="mobile_number"
            type="tel"
            onChange={changeHandler}
            value={searchNumber.mobile_number}
            placeholder="Enter a customer's phone number"
            style={{ width: "300px" }}
            required
          />
        </form>
      </div>
      <div>
        <button onClick={searchHandler} type="submit" style={{marginBottom: "10px"}} className="btn-primary m-1">
          Find
        </button>
      </div>
      </div>
      <div className="search-body">
      
        <ErrorAlert error={phoneError} />
        <ReservationList reservations={foundReservations} />
      </div>
    </div>
  );
}

export default SearchByPhone;
