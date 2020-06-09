import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PublicIcon from "@material-ui/icons/Public";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import HealingIcon from "@material-ui/icons/Healing";
import { useStyles } from "./styles";
import { onlyNumber, onlyLetterAndSpace } from "../../helpers/Regexp";
import { useQuery } from "react-apollo";
import {
  GET_SEGUROS,
  GET_MORBILIDADES,
  GET_PROVINCIAS,
  GET_DISTRITOS,
} from "./Querys";
import Header from "../Header/Index";

const Index = () => {
  const classes = useStyles();

  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");

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
    estado: "pendiente",
  });

  const [validate, setValidate] = useState({
    dni: true,
    nombres: true,
    edad: true,
    direccion: true,
    provincia: true,
    distrito: true,
    seguro: true,
    celular: true,
    morbilidades: true,
    latitud: true,
    longitud: true,
  });

  const { loading: loadingSeguros, data: dataSeguros } = useQuery(GET_SEGUROS, {
    variables: {
      sortby: [
        {
          field: "nombre",
          direction: "ASC",
        },
      ],
    },
  });
  const { loading: loadingMorbilidades, data: dataMorbilidades } = useQuery(
    GET_MORBILIDADES,
    {
      variables: {
        sortby: [
          {
            field: "nombre",
            direction: "ASC",
          },
        ],
      },
    }
  );

  let seguros = null;
  if (!loadingSeguros) {
    seguros = dataSeguros.getSeguros.map((ele, id) => {
      return (
        <MenuItem key={ele._id} value={ele.nombre}>
          {ele.nombre}
        </MenuItem>
      );
    });
  }

  const handleChangeCheck = () => {};

  let morbilidades = null;
  if (!loadingMorbilidades) {
    morbilidades = dataMorbilidades.getMorbilidades.map((ele, id) => {
      return (
        <FormControlLabel
          key={ele._id}
          item
          className={classes.formControllabel}
          control={
            <Checkbox
              checked={false}
              onChange={handleChangeCheck}
              name={ele.nombre}
              className={classes.formControlCheck}
            />
          }
          label={ele.nombre}
        />
      );
    });
  }

  const handleChangeInputName = (evt) => {
    const { value } = evt.target;
    if (onlyLetterAndSpace(value)) {
      return;
    }
    setNombres(value.toUpperCase());
    setState({
      ...state,
      nombres: `${apellidoPaterno.trim()} ${apellidoMaterno.trim()} ${nombres.trim()}`,
    });
  };
  const handleChangeInputPattern = (evt) => {
    const { value } = evt.target;
    if (onlyLetterAndSpace(value)) {
      return;
    }
    setApellidoPaterno(value.toUpperCase());
    setState({
      ...state,
      nombres: `${apellidoPaterno.trim()} ${apellidoMaterno.trim()} ${nombres.trim()}`,
    });
  };
  const handleChangeInputMattern = (evt) => {
    const { value } = evt.target;
    if (onlyLetterAndSpace(value)) {
      return;
    }
    setApellidoMaterno(value.toUpperCase());
    setState({
      ...state,
      nombres: `${apellidoPaterno.trim()} ${apellidoMaterno.trim()} ${nombres.trim()}`,
    });
  };

  const handleChangeInput = (evt) => {
    const { name, value } = evt.target;
    if (name === "dni") {
      if (value.length > 8) {
        return;
      }
      if (onlyNumber(value)) {
        return;
      }
    }
    if (name === "edad") {
      if (value.length > 3) {
        return;
      }
      if (onlyNumber(value)) {
        return;
      }
    }
    if (name === "celular") {
      if (value.length > 9) {
        return;
      }
      if (onlyNumber(value)) {
        return;
      }
    }
    setState({
      ...state,
      [name]: value.toUpperCase(),
    });
  };

  const validateMsg = (input) => {};

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        <Grid className={classes.grid}>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Grid container className={classes.containerForm}>
                <Grid item xs={12} sm={4} md={2}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <PaymentIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <TextField
                          error={!validate.dni}
                          id="ipt-dni"
                          label="DNI"
                          type="text"
                          name="dni"
                          value={state.dni}
                          className={classes.input}
                          onChange={handleChangeInput}
                          helperText={
                            !validate.dni && (() => validateMsg("dni"))
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={3}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <AccountCircleIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <TextField
                          id="ipt-nombres"
                          label="Nombres"
                          type="text"
                          name="nombres"
                          value={nombres}
                          className={classes.input}
                          onChange={handleChangeInputName}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={5} md={3}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <AccountCircleIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <TextField
                          id="ipt-paterno"
                          label="Apellido Paterno"
                          type="text"
                          name="paterno"
                          value={apellidoPaterno}
                          className={classes.input}
                          onChange={handleChangeInputPattern}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={5} md={3}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <AccountCircleIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <TextField
                          id="ipt-materno"
                          label="Apellido Materno"
                          type="text"
                          name="materno"
                          value={apellidoMaterno}
                          className={classes.input}
                          onChange={handleChangeInputMattern}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={2} md={1}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <DateRangeIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <TextField
                          id="ipt-edad"
                          label="Edad"
                          type="text"
                          name="edad"
                          value={state.edad}
                          className={classes.input}
                          onChange={handleChangeInput}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <PersonPinCircleIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <TextField
                          id="ipt-direccion"
                          label="Dirección"
                          type="text"
                          name="direccion"
                          value={state.direccion}
                          className={classes.input}
                          onChange={handleChangeInput}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <PublicIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <FormControl className={classes.containerInput_}>
                          <InputLabel id="ipt-provincia-label">
                            Provincia
                          </InputLabel>
                          <Select
                            labelId="ipt-provincia-label"
                            id="ipt-provincia"
                            name="provincia"
                            value={state.provincia}
                            className={classes.input}
                            onChange={handleChangeInput}
                          >
                            {seguros}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <PublicIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <FormControl className={classes.containerInput_}>
                          <InputLabel id="ipt-distrito-label">
                            Distrito
                          </InputLabel>
                          <Select
                            labelId="ipt-distrito-label"
                            id="ipt-distrito"
                            name="distrito"
                            value={state.distrito}
                            className={classes.input}
                            onChange={handleChangeInput}
                          >
                            {seguros}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <PhoneAndroidIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <TextField
                          error={!validate.celular}
                          id="ipt-celular"
                          label="Celular"
                          type="text"
                          name="celular"
                          value={state.celular}
                          className={classes.input}
                          onChange={handleChangeInput}
                          helperText={
                            !validate.celular && (() => validateMsg("celular"))
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <EnhancedEncryptionIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <FormControl className={classes.containerInput_}>
                          <InputLabel id="ipt-seguro-label">Seguro</InputLabel>
                          <Select
                            labelId="ipt-seguro-label"
                            id="ipt-seguro"
                            name="seguro"
                            value={state.seguro}
                            className={classes.input}
                            onChange={handleChangeInput}
                          >
                            {seguros}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <div className={classes.form}>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                    >
                      <Grid item>
                        <HealingIcon className={classes.icon} />
                      </Grid>
                      <Grid item className={classes.containerInput}>
                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                        >
                          <FormLabel
                            component="legend"
                            className={classes.formLabel}
                          >
                            Morbilidades
                          </FormLabel>
                          <FormGroup row>{morbilidades}</FormGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Index;
