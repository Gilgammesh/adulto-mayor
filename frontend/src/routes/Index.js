import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/Login/Index";
import Admin from "../components/Admin/Index";

// Rutas de la App
const Index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Login />} />
        <Route path="/monitor" exact render={() => <Login />} />
        <Route path="/login" exact render={() => <Login />} />
        <Route path="/admin" exact render={() => <Admin />} />
      </Switch>
    </Router>
  );
};

export default Index;
