import React, {useState} from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import Search from "./Search";
import NewTable from "./Tables/NewTable";
import NewReservation from "../Reservations/NewReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());
  

  // useEffect(loadDate, [date, url, query]);

  // function loadDate() {
  //   const newDate = query.get("date");
  //   console.log("routes newDate", newDate)
  //   if (newDate) setDate(newDate);
  // }

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard/"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard/"} />
           </Route>           
      <Route path="/dashboard/:date">
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route path ="/dashboard/">
        <Dashboard />
      </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/reservations/new">
          <NewReservation  />
        </Route>
        <Route path="/tables/new">
          <NewTable />
        </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
