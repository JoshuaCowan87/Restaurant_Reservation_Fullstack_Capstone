import { useHistory, Link, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { reservationById, listTables, seatTable } from "../utils/api";
import ErrorAlert from "./ErrorAlert";


function SeatReservation() {
  const history = useHistory();
    const [reservation, setReservation] = useState([]);
    const [tables, setTables] = useState([])
    const [currentTable, setCurrentTable] = useState({table_id:""})
    const [errors, setErrors] = useState(null)
    const {reservation_id} = useParams();

useEffect(load, [])


function load () {
    const abortController = new AbortController();
    reservationById(reservation_id, abortController.signal)
        .then(result => result[0])
        .then(setReservation)
        .catch(setErrors)
    listTables(abortController.signal)
      .then(setTables)
      .catch(setErrors);
    return () => abortController.signal
}
  const submitHandler = async (e) => {
    e.preventDefault();
   const abortController = new AbortController;
   try {
await seatTable(reservation_id, currentTable.table_id, abortController.signal);
history.push("/dashboard");
   } catch(error) {
     setErrors(error)
   }
   return () => abortController.abort()
  }

  const reservationCard = (
<div className="card" key={reservation.reservation_id}>
          <div className="card-header">
            <h2>{reservation.reservation_date}</h2>
            <h2>
              {reservation.last_name} {reservation.first_name}
            </h2>
            <h2>{reservation.reservation_time}</h2>
          </div>
          <div className="card-body">
            <p>{reservation.mobile_number}</p>
            <p>{reservation.people}</p>
          </div>
        </div>
  )
  
const changeHandler = (e) => {
   setCurrentTable({
       ...currentTable, [e.target.name] : e.target.value
   })
}

//only list options for tables that are not currently seated
const freeTables = tables.filter(table => table.reservation_id === null)

  return (
    <div>
      <div>Seat Reservation</div>
      <ErrorAlert error={errors} />
      <div>{reservationCard}</div>
      <div>
          <form>
              <h3>Select a table</h3>
            <select 
                name="table_id"
                onChange={changeHandler}              
                > {freeTables.map((table) => (
                    <option key={table.table_id} value={table.table_id} defaultValue="Select Table">
                        {table.table_name} - {table.capacity}
                    </option>
                    ))}
                </select>
          </form>
      </div>
      <button onClick={() => history.goBack()}>Cancel</button>
      <button onClick={submitHandler} type="submit">
        Seat
      </button>
    </div>
  );
}

export default SeatReservation;
