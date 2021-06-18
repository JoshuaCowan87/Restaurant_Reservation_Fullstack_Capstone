import FormError from "./FormError";
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
    people: "",
  });
  let errors = [];
  let errorMessages = [
    "Reservation must be in the future",
    "Restaurant is Closed on Tuesdays",
    "Reservations must be between 1030am and 930pm",
  ];
  const changeHandler = (e) => {
   //e.preventDefault();

    //reservation must be in the future
    if (e.target.name === "reservation_date") {
      let date = new Date(e.target.value);
      let today = new Date();
      if (today > date) {
        if (!errors.includes(errorMessages[0])) {
          errors.push("Reservation must be in the future");
        }
      }
    }
    //reservation cannot be on a tuesday
    if (e.target.name === "reservation_date") {
      let date = new Date(e.target.value);
      let day = date.getUTCDay();
      if (day === 2) {
        if (!errors.includes(errorMessages[1])) {
          errors.push("Restaurant is Closed on Tuesdays");
        }
      }
    }
    //reservation must be between 1030am and 930pm
    if (e.target.name === "reservation_time") {
      console.log("e.target.value", e.target.value)
      if (e.target.value < "10:30" || e.target.value > "21:30") {
        if (!errors.includes(errorMessages[2])) {
          errors.push("Reservations must be between 1030am and 930pm");
        }
      }
    }
    console.log(errors)
    setFormErrors([...formErrors], errors);

    setNewReservationData({
      ...newReservationData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    const abortController = new AbortController();
    if (errors.length > 0) {
      console.log("Form not submitted due to form errors");
    } else {
      try {
        await createReservation(newReservationData, abortController.signal);
        history.push(`/dashboard/${newReservationData.reservation_date}`);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error
        }
      }
    }
  };

  function cancelHandler(e) {
    history.push("/dashboard");
  }

  return (
    <div>
      <FormError formErrors={formErrors} />
      <ReservationForm
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
        newReservationData={newReservationData}
        formErrors={formErrors}
      />
    </div>
  );
}

export default NewReservation;
