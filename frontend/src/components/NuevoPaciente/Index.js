import React, { useState } from "react";
import {
  Grid,
  Paper,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import { useStyles } from "./styles";
import Header from "../Header/Index";

const Index = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    dni: "",
    nombres: "",
    edad: "",
    direccion: "",
    provincia: "",
    distrito: "",
    seguro: "",
    celular: "",
    morbilidades: [],
    latitud: "",
    longitud: "",
    estado: "",
    celulares: [],
    contacto: "",
  });

  const handleChangeInput = (evt) => {
    const { name, value } = evt.target;
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        <Grid className={classes.grid}>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <form id="divTablePadron" className={classes.containerForm}>
                <FormControl className={classes.form}>
                  <InputLabel className={classes.inputlabel} htmlFor="ipt-user">
                    Usuario
                  </InputLabel>
                  <Input
                    id="ipt-user"
                    type="text"
                    name="user"
                    value={state.user}
                    className={classes.input}
                    onChange={handleChangeInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <RecentActorsIcon className={classes.icon} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Index;
