

function ReservationList ({reservations}) {

const sortedReservations = reservations.sort((a,b) => {
   return a.reservation_time - b.reservation_time
})
console.log("reservations", sortedReservations)
if (reservations.length < 1) {
    return (
        <div>No reservations found for this date</div>
    )
} else {
    return(
        <div>
            
        </div>
    )
}
}

export default ReservationList;