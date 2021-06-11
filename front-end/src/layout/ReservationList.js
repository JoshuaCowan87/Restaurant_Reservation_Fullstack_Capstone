

function ReservationList ({reservations}) {
//const date = today();
//console.log("date", date)
const sortedReservations = reservations.sort((a,b) => {
   return b.reservation_time - a.reservation_time
})
console.log("reservations", reservations)

const list = sortedReservations.map(sortedReservation => {
    return (
        <div>
            <div className="card" key={sortedReservation.reservation_id}>
                <div className="card-header">
                    <h2>{sortedReservation.reservation_date}</h2>
                    <h2>{sortedReservation.last_name}, {sortedReservation.first_name}</h2>
                    <h2>{sortedReservation.reservation_time}</h2>
                </div>
                <div className="card-body">
                    <p>{sortedReservation.mobile_number}</p>
                    <p>{sortedReservation.people}</p>
                </div>
            </div>
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