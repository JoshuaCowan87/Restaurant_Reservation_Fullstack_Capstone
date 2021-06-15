


function ReservationError ({reservationErrors}) {
/*
const errorList = reservationErrors.map(error => {
    return (
    <div className="alert alert-danger m-2">Error: {error.message}</div>
        
    )
})
*/
    if (reservationErrors.length > 0) {
        return (
            <div>
                <p>yes errors</p>
        {/*    {errorList}       */}
            </div>
        )
    }
    else return (
        <p>no error</p>
    )
}


export default ReservationError;