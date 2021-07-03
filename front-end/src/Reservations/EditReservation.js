import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom"
import { reservationById } from "../utils/api";
import ReservationForm from "./ReservationForm";
import { updateReservation } from "../utils/api";
import ErrorAlert from "../Errors/ErrorAlert";



function EditReservation () {
const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: ""
  }
const [updatedResData, setUpadtedResData] = useState(initialFormState)
const {reservation_id} = useParams();
const [formErrors, setFormErrors] = useState(null);
const history = useHistory()

useEffect(loadCurrentRes, [reservation_id])
    
 function loadCurrentRes() {
    const abortController = new AbortController();
    setFormErrors(null)
    reservationById(reservation_id, abortController.signal)  
    .then(setUpadtedResData)
    .catch(setFormErrors);
 return () => abortController.abort()
        }



const changeHandler = (e) => {
    e.preventDefault();
  setUpadtedResData({...updatedResData, [e.target.name]: e.target.value})
}


const submitHandler = async (e) => {
    e.preventDefault();
   const abortController = new AbortController();
   try {
   const reservation = await updateReservation(updatedResData, reservation_id, abortController.signal);
   const updatedDate = reservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
   history.push(`/dashboard?date=${updatedDate}`);
   } catch(error) {
         setFormErrors(error)
    }
    return () => abortController.abort()
}


    return (
        <div>
        <ErrorAlert error={formErrors} />
        <ReservationForm 
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        reservationData={updatedResData}
        />
        
        </div>
    )
    }

    export default EditReservation;