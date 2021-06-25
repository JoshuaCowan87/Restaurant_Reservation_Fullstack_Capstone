import {Link} from "react-router-dom";

function ReservationList ({reservations}) {

const cancelHandler = (e) => {
    console.log("cancel")
}

const list = reservations.map(reservation => {
    let reservation_id = reservation.reservation_id;
    return (
        
            <div className="card" key={reservation.reservation_id}>
                <div className="card-header">
                    <h2>{reservation.reservation_date}</h2>
                    <h2>{reservation.last_name}, {reservation.first_name}</h2>
                    <h2>{reservation.reservation_time}</h2>
                </div>
                <div className="card-body">
                    <p>{reservation.mobile_number}</p>
                    <p>{reservation.people}</p>
                </div>
                <Link to={`/reservations/${reservation_id}/seat`}>Seat</Link> 
                <Link to={`/reservations/${reservation_id}/edit`}>Edit</Link>
                <button data-reservation-id-cancel={reservation.reservation_id} onClick={cancelHandler} >Cancel</button>
            </div>
        
    )
}
)
if (reservations.length < 1) {
    return (
        <div>No reservations found</div>
    )
} else {
    return (
        <div>{list}</div>
    )
    
}
    
}

export default ReservationList;