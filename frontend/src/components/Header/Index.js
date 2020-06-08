import React from "react";
import { useHistory } from "react-router-dom";
import Responsive from "react-responsive";
import { AppBar, Toolbar, Typography, Hidden, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import { useStyles } from "./styles";
import logo from "../../assets/img/logo.png";
import grsm from "../../assets/img/logo_grsm.png";
import { deleteToken } from "../../helpers/Auth";

const Index = () => {
  const history = useHistory();

  const classes = useStyles();

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[400]),
      backgroundColor: red[400],
      "&:hover": {
        backgroundColor: red[600],
      },
    },
  }))(Button);

  const Desktop = (props) => <Responsive {...props} minWidth={992} />;
  const Tablet = (props) => (
    <Responsive {...props} minWidth={768} maxWidth={991} />
  );

  const logOut = () => {
    deleteToken();
    history.push("/login");
  };

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolBar}>
        <img className={classes.imgLogo} src={logo} alt="logo" />
        <Typography variant="h5" className={classes.title}>
          PLATAFORMA DE GESTIÓN EN SALUD Y RIESGOS DE ADULTOS MAYORES
        </Typography>
        <Hidden smDown>
          <img className={classes.imgGrsm} src={grsm} alt="goresam" />
        </Hidden>
        <ColorButton
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          startIcon={<AssignmentReturnIcon />}
          onClick={logOut}
        >
          <Desktop>Salir</Desktop>
          <Tablet>Salir</Tablet>
        </ColorButton>
      </Toolbar>
    </AppBar>
  );
};

export default Index;
