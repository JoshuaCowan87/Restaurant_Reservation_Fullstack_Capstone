import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom"
import { reservationById } from "../utils/api";
import ReservationForm from "./ReservationForm";
import { updateReservation } from "../utils/api";
import FormError from "./FormError";


function EditReservation () {
// const initialFromState = ({
//     first_name: "",
//     last_name: "",
//     mobile_number: "",
//     reservation_date: "",
//     reservation_time: "",
//     people: 0,
// })
const [updatedResData, setUpadtedResData] = useState({})
const {reservation_id} = useParams();
const [formErrors, setFormErrors] = useState([]);
const history = useHistory()

useEffect(() => {
    const abortController = new AbortController();
 function loadCurrentRes() {
    reservationById(reservation_id, abortController.signal)  
    .then(setUpadtedResData)
    .catch(formErrors)
        }

loadCurrentRes();
}, [reservation_id]
)
console.log("editRes, res_id", reservation_id)
console.log("updatesResData", updatedResData)
const changeHandler = (e) => {
    e.preventDefault();
  setUpadtedResData({...updatedResData, [e.target.name]: e.target.value})
}


const submitHandler = async (e) => {
   const abortController = new AbortController();
   try {
   await updateReservation(updatedResData, reservation_id, abortController.signal);
   history.push("/dashboard");
   } catch(error) {
        setFormErrors(error)
    }
    return () => abortController.abort()
}


    return (
        <div>
        <FormError formErrors={formErrors} />
        <ReservationForm 
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        reservationData={updatedResData}
        />
        
        </div>
    )
    }

    export default EditReservation;