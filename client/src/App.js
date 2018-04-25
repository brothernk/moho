import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";

const App = () => 
(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  </Router>
);

export default App;

