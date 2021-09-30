import React, {useState} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import NotFound from "../Errors/NotFound";
import { today } from "../utils/date-time";
import SearchByPhone from "./SearchByPhone";
import NewTable from "../Tables/NewTable";
import NewReservation from "../Reservations/NewReservation";
import EditReservation from "../Reservations/EditReservation";
import SeatReservation from "../Reservations/SeatReservation"

/**
 * Defines all the routes for the application.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());


  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard/"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard/"} />
           </Route>           
      <Route path ="/dashboard/">
        <Dashboard date={date} setDate={setDate} />
      </Route>
        <Route exact path="/search">
          <SearchByPhone />
        </Route>
        <Route exact path="/reservations/new">
          <NewReservation  />
        </Route>
        <Route path="/tables/new">
          <NewTable />
        </Route>
        <Route path="/reservations/:reservation_id/seat" >
          <SeatReservation />
        </Route>
        <Route path="/reservations/:reservation_id/edit">
          <EditReservation />
        </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
