import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Box,
  Typography,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useStyles } from "./styles";
import logo from "../../assets/img/logo.png";
import { useMutation } from "react-apollo";
import { LOGIN_USUARIO } from "./Querys";
import { setToken } from "../../helpers/Auth";
import Swal from "sweetalert2";

const Index = () => {
  const history = useHistory();

  const [state, setState] = useState({
    user: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);

  const classes = useStyles();

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[600]),
      backgroundColor: red[600],
      "&:hover": {
        backgroundColor: red[800],
      },
    },
  }))(Button);

  const [loginUsuario] = useMutation(LOGIN_USUARIO, {
    onCompleted({ loginUsuario }) {
      setIsLogin(false);
      if (loginUsuario) {
        const { estado, msg, token } = loginUsuario;
        if (!estado) {
          Swal.fire({
            title: "Error",
            text: msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
          return;
        }
        // Guardamos el token en el LocalStorage del navegador web
        setToken(token);
        history.push("/admin");
      }
    },
  });

  const handleChangeInput = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setIsLogin(true);
    loginUsuario({ variables: { form: state } });
  };

  return (
    <div className={classes.root}>
      <Grid container justify="flex-end">
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Paper className={classes.paper} elevation={3}>
            <Box className={classes.box1}>
              <img className={classes.imgLogo} src={logo} alt="logo" />
              <Typography className={classes.textSistema}>
                PLATAFORMA DE GESTIÓN EN SALUD Y RIESGOS DE ADULTOS MAYORES
              </Typography>
            </Box>
            <Box className={classes.box2}>
              <form className={classes.box2_}>
                <Typography className={classes.textLogin}>
                  Iniciar Sesión
                </Typography>
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
                        <PersonIcon className={classes.icon} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.form}>
                  <InputLabel
                    className={classes.inputlabel}
                    htmlFor="ipt-password"
                  >
                    Contraseña
                  </InputLabel>
                  <Input
                    id="ipt-password"
                    type="password"
                    name="password"
                    className={classes.input}
                    value={state.password}
                    onChange={handleChangeInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <LockIcon className={classes.icon} />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <ColorButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                  endIcon={
                    isLogin ? (
                      <CircularProgress className={classes.progress} size={20} />
                    ) : (
                      <ExitToAppIcon />
                    )
                  }
                  onClick={handleFormSubmit}
                >
                  Ingresar
                </ColorButton>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
