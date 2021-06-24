import {useHistory} from "react-router-dom"

function SeatReservation () {
const history = useHistory();

    return (
        <div>
        <div>Seat Reservation</div>
        <button onClick={() =>history.goBack()}>Cancel</button>
        </div>
    )
    }
    
    export default SeatReservation;