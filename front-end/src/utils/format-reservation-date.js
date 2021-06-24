import { formatAsDate } from "./date-time";

function formatDate(reservation) {
//  console.log("r.r_d 1", reservation.reservation_date)
  reservation.reservation_date = formatAsDate(reservation.reservation_date);
 // console.log("r.r_d 2", reservation.reservation_date)
  return reservation;
}

/**
 * Formats the reservation_date property of a reservation.
 * @param reservations
 *  a single reservation, or an array of reservations.
 * @returns {[reservation]|reservation}
 *  the specified reservation(s) with the reservation_date property formatted as YYYY-MM-DD.
 */
export default function formatReservationDate(reservations) {
//  console.log("FRD", reservations)
  return Array.isArray(reservations)
    ? reservations.map(formatDate)
    : formatDate(reservations);
}
