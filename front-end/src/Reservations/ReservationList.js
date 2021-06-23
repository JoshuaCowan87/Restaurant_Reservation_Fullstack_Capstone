

function ReservationList ({reservations}) {

const list = reservations.map(reservation => {
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
                {/*<Link to={`/reservations/${reservation_id}/seat`}>Seat</Link> */}
            </div>
        
    )
}
)
if (reservations.length < 1) {
    return (
        <div>No reservations found for this date</div>
    )
} else {
    return (
        <div>{list}</div>
    )
    
}
    
}

export default ReservationList;