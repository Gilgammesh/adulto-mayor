import React from "react";
import Responsive from "react-responsive";
import { AppBar, Toolbar, Typography, Hidden } from "@material-ui/core";
import { useStyles } from "./styles";
import logo from "../../assets/img/logo.png";
import grsm from "../../assets/img/logo_grsm.png";

const Index = () => {
  const classes = useStyles();

  const Desktop = (props) => <Responsive {...props} minWidth={992} />;
  const Tablet = (props) => (
    <Responsive {...props} minWidth={768} maxWidth={991} />
  );
  const Mobile = (props) => <Responsive {...props} maxWidth={767} />;

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolBarPrimary}>
        <img className={classes.imgLogo} src={logo} alt="logo" />
        <Desktop>
          <Typography variant="h5" className={classes.title}>
            PLATAFORMA DE GESTIÓN EN SALUD Y RIESGOS DE ADULTOS MAYORES
          </Typography>
        </Desktop>
        <Tablet>
          <Typography variant="h6" className={classes.title}>
            PLATAFORMA DE GESTIÓN EN SALUD Y RIESGOS DE ADULTOS MAYORES
          </Typography>
        </Tablet>
        <Mobile>
          <Typography variant="h6" className={classes.title}>
            PLATAFORMA DE GESTIÓN EN SALUD Y RIESGOS DE ADULTOS MAYORES
          </Typography>
        </Mobile>
        <Hidden smDown>
          <img className={classes.imgGrsm} src={grsm} alt="goresam" />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Index;
