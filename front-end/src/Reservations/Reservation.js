import {useParams} from "react-router-dom"


function Reservation () {

const {reservation_id} = useParams();

    return (
        <div>/reservations/${reservation_id}/seat</div>
    )
    }

    export default Reservation;