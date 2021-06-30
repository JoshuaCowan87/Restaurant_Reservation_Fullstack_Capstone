import {Link} from "react-router-dom";

function ReservationList ({reservations}) {

const cancelHandler = async (id) => {
   
}


const list = reservations.map(reservation => {
    if (reservation.status === "finished") return null
    return (
        
            <div className="card" key={reservation.reservation_id}>
                <div className="card-header">
                    <h2>Date: {reservation.reservation_date}</h2>
                    <h2>{reservation.last_name}, {reservation.first_name}</h2>
                    <h2>{reservation.reservation_time}</h2>
                    <h2 data-reservation-id-status={reservation.reservation_id} >Status: {reservation.status}</h2>
                </div>
                <div className="card-body">
                    <p>{reservation.mobile_number}</p>
                    <p>{reservation.people} People</p>
                </div>
              {reservation.status === "booked" &&  <Link to={`/reservations/${reservation.reservation_id}/seat`} className="btn btn-success">Seat</Link> }
                <Link to={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-warning">Edit</Link>
            
                <button data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelHandler(reservation.reservation_id)} >Cancel</button>
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