import {useParams, link} from "react-router-dom"
import {useState} from "react";

function Reservation () {

const {reservation_id} = useParams();

    return (
        <div>/reservations/${reservation_id}/seat</div>
    )
    }

    export default Reservation;