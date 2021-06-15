import React, {useState, useEffect} from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import useQuery from "../utils/useQuery";
import Search from "./Search";
import NewTable from "./NewTable";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());
  const url = useRouteMatch();
  const query = useQuery();


  useEffect(loadDate, [date, url, query]);

  function loadDate() {
    const newDate = query.get("date");
    if (newDate) setDate(newDate);
  }

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
           </Route>
      <Route path="/dashboard">
        <Dashboard date={date} setDate = {setDate} />
      </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/reservations/new">
          <ReservationForm />
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
