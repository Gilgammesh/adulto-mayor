import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../components/Login/Index";
import Padron from "../components/Padron/Index";
import NuevoPaciente from "../components/NuevoPaciente/Index";
import EditarPaciente from "../components/EditarPaciente/Index";
import { getToken } from "../helpers/Auth";

// Rutas de la App
const Index = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (getToken() ? <Padron /> : <Login />)}
        />
        <Route
          path="/monitor"
          j
          exact
          render={() => (getToken() ? <Padron /> : <Redirect to="/login" />)}
        />
        <Route
          path="/login"
          exact
          render={() => (getToken() ? <Redirect to="/" /> : <Login />)}
        />
        <Route
          path="/padron"
          exact
          render={() => (getToken() ? <Padron /> : <Redirect to="/login" />)}
        />
        <Route
          path="/nuevo_paciente"
          exact
          render={() =>
            getToken() ? <NuevoPaciente /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/editar_paciente/:dni"
          exact
          render={({ match }) =>
            getToken() ? (
              <EditarPaciente match={match} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
};

export default Index;
