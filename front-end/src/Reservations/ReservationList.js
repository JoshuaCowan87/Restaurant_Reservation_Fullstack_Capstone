import { Link } from "react-router-dom";

function ReservationList({ reservations, cancelHandler }) {
  const list = reservations.map((reservation) => {
    if (reservation.status === "finished" || reservation.status === "cancelled")
      return null;
    return (
      <div
        className="col-lg-4 col-xl-3 m-3 reservation-card text-black"
        key={reservation.reservation_id}
      >
        <h3>{reservation.reservation_date}</h3>
        <h4>
          Name: {reservation.last_name}, {reservation.first_name}
        </h4>
        <h5>Time: {reservation.reservation_time}</h5>

        <h5>Phone Number: {reservation.mobile_number}</h5>
        <h5>Size: {reservation.people}</h5>
        <br />
        <h6 data-reservation-id-status={reservation.reservation_id}>
          Status: {reservation.status}
        </h6>
        <div>
          {reservation.status === "booked" && (
            <Link
              to={`/reservations/${reservation.reservation_id}/seat`}
              className="btn btn-success res-card-link"
              
            >
              Seat
            </Link>
          )}
          {"   "}
          {reservation.status === "booked" && (
            <Link
              to={`/reservations/${reservation.reservation_id}/edit`}
              className="btn btn-success res-card-link"
            >
              Edit
            </Link>
          )}
          {"   "}
          <button
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={() => cancelHandler(reservation.reservation_id)}
            className="btn btn-danger res-card-link"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  });

  if (reservations.length < 1) {
    return (
      <div>
        <h3 className="search-res-list">No reservations found</h3>
        <br></br>
        <br></br>
      </div>
    );
  }
  return (
    <div className="row res-card-container">
      {list}
      <br />
    </div>
  );
}

export default ReservationList;
