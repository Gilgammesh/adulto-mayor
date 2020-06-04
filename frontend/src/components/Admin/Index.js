import React from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import Header from "../Header/Index";
import Filtro from "./Filtro/Index";
import Tabla from "./Tabla/Index";

const Index = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        <Grid className={classes.grid}>
          <Tabla />
        </Grid>
      </div>
    </div>
  );
};

export default Index;
