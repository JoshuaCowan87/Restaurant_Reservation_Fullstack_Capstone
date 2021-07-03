import FormError from "../Errors/FormError";
import ReservationForm from "./ReservationForm";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();
  const [formErrors, setFormErrors] = useState([]);
  const [newReservationData, setNewReservationData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  const changeHandler = (e) => {
    e.preventDefault();
    setNewReservationData({
      ...newReservationData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      await createReservation(newReservationData, abortController.signal);
      history.push(`/dashboard?date=${newReservationData.reservation_date}`);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        setFormErrors([error.message]);
      }
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <FormError formErrors={formErrors} />
      <ReservationForm
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        reservationData={newReservationData}
        formErrors={formErrors}
      />
    </div>
  );
}

export default NewReservation;
