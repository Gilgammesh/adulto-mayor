import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../components/Login/Index";
import Admin from "../components/Admin/Index";
import NuevoPaciente from "../components/NuevoPaciente/Index";
import { getToken } from "../helpers/Auth";

// Rutas de la App
const Index = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (getToken() ? <Admin /> : <Login />)}
        />
        <Route
          path="/monitor"
          exact
          render={() => (getToken() ? <Admin /> : <Redirect to="/login" />)}
        />
        <Route
          path="/login"
          exact
          render={() => (getToken() ? <Redirect to="/" /> : <Login />)}
        />
        <Route
          path="/admin"
          exact
          render={() => (getToken() ? <Admin /> : <Redirect to="/login" />)}
        />
        <Route
          path="/nuevo_paciente"
          exact
          render={() =>
            getToken() ? <NuevoPaciente /> : <Redirect to="/login" />
          }
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

export default Index;
