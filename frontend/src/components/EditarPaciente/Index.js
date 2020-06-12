import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
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
  Typography,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import PaymentIcon from "@material-ui/icons/Payment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PublicIcon from "@material-ui/icons/Public";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import HealingIcon from "@material-ui/icons/Healing";
import ContactsIcon from "@material-ui/icons/Contacts";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PersonIcon from "@material-ui/icons/Person";
import L, { Icon } from "leaflet";
import "leaflet-control-geocoder";
import { Map, TileLayer, Polygon } from "react-leaflet";
import marker from "../../assets/img/marker.png";
import markerShadow from "../../assets/img/marker-shadow.png";
import { useStyles } from "./styles";
import { onlyNumber, onlyLetterAndSpace } from "../../helpers/Regexp";
import { useQuery, useLazyQuery, useMutation } from "react-apollo";
import {
  GET_SEGUROS,
  GET_MORBILIDADES,
  GET_DEPARTAMENTO,
  GET_PROVINCIAS,
  GET_PROVINCIA,
  GET_DISTRITOS,
  GET_DISTRITO,
  GET_PACIENTE,
  UPDATE_PACIENTE,
} from "./Querys";
import Header from "../Header/Index";
import Swal from "sweetalert2";
import Loading from "../Loading/Index";

const Index = (props) => {
  const { match } = props;
  const { params } = match;
  const { dni } = params;

  const history = useHistory();
  const classes = useStyles();

  const [regresar, setRegresar] = useState(false);

  const [distritos, setDistritos] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState({
    latitud: -7.1,
    longitud: -76.8,
  });

  const [id, setId] = useState("");
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
    contacto: "",
    diagnostico: "",
  });

  const [validate /*, setValidate*/] = useState({
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
    contacto: true,
    diagnostico: true,
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
  const { loading: loadingDepartamento, data: dataDepartamento } = useQuery(
    GET_DEPARTAMENTO,
    {
      variables: {
        filter: {
          nombre: "SAN MARTIN",
        },
      },
    }
  );
  const { loading: loadingProvincias, data: dataProvincias } = useQuery(
    GET_PROVINCIAS,
    {
      variables: {
        sortby: [
          {
            field: "codigo",
            direction: "ASC",
          },
        ],
      },
    }
  );
  const [getDistritos] = useLazyQuery(GET_DISTRITOS, {
    onCompleted({ getDistritos }) {
      if (getDistritos) {
        setState({
          ...state,
          distrito: "",
        });
        setDistritos(
          getDistritos.map((ele, id) => {
            return (
              <MenuItem key={ele._id} value={ele.nombre}>
                {`${ele.codigo} - ${ele.nombre}`}
              </MenuItem>
            );
          })
        );
      }
    },
  });
  const [getDistritos_] = useLazyQuery(GET_DISTRITOS, {
    onCompleted({ getDistritos }) {
      if (getDistritos) {
        setDistritos(
          getDistritos.map((ele, id) => {
            return (
              <MenuItem key={ele._id} value={ele.nombre}>
                {`${ele.codigo} - ${ele.nombre}`}
              </MenuItem>
            );
          })
        );
      }
    },
  });
  const [getProvincia] = useLazyQuery(GET_PROVINCIA, {
    onCompleted({ getProvincia }) {
      if (getProvincia) {
        setCenter({
          latitud: getProvincia.latitud,
          longitud: getProvincia.longitud,
        });
        setZoom(12);
      }
    },
  });
  const [getDistrito] = useLazyQuery(GET_DISTRITO, {
    onCompleted({ getDistrito }) {
      if (getDistrito) {
        setCenter({
          latitud: getDistrito.latitud,
          longitud: getDistrito.longitud,
        });
        setZoom(15);
      }
    },
  });

  const [getPaciente] = useLazyQuery(GET_PACIENTE, {
    onCompleted({ getPaciente }) {
      if (getPaciente) {
        getDistritos_({
          variables: {
            filter: {
              provincia: getPaciente.provincia ? getPaciente.provincia : "",
            },
            sortby: [
              {
                field: "codigo",
                direction: "ASC",
              },
            ],
          },
        });
        setId(getPaciente._id ? getPaciente._id : "");
        setState({
          dni: getPaciente.dni ? getPaciente.dni : "",
          nombres: getPaciente.nombres ? getPaciente.nombres : "",
          edad: getPaciente.edad ? getPaciente.edad : "",
          direccion: getPaciente.direccion ? getPaciente.direccion : "",
          provincia: getPaciente.provincia ? getPaciente.provincia : "",
          distrito: getPaciente.distrito ? getPaciente.distrito : "",
          seguro: getPaciente.seguro ? getPaciente.seguro : "",
          celular: getPaciente.celular ? getPaciente.celular : "",
          morbilidades: getPaciente.morbilidades
            ? getPaciente.morbilidades
            : "",
          latitud: getPaciente.latitud ? getPaciente.latitud : "",
          longitud: getPaciente.longitud ? getPaciente.longitud : "",
          estado: getPaciente.estado ? getPaciente.estado : "",
          contacto: getPaciente.contacto ? getPaciente.contacto : "",
          diagnostico: getPaciente.diagnostico ? getPaciente.diagnostico : "",
        });

        if (getPaciente.latitud && getPaciente.longitud) {
          setCenter({
            latitud: getPaciente.latitud ? getPaciente.latitud : "",
            longitud: getPaciente.longitud ? getPaciente.longitud : "",
          });
          setZoom(15);
        } else {
          getDistrito({
            variables: {
              provincia: getPaciente.provincia,
              filter: {
                nombre: getPaciente.distrito,
              },
            },
          });
        }
      }
    },
  });

  const [updatePaciente] = useMutation(UPDATE_PACIENTE, {
    onCompleted({ updatePaciente }) {
      if (updatePaciente) {
        Swal.fire({
          title: "Paciente",
          text: "Se actualizo paciente correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  const mapEl = useRef(null);

  const url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
  const attribution =
    "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>";
  const position = [center.latitud, center.longitud];

  useEffect(() => {
    getPaciente({
      variables: {
        filter: {
          dni: dni,
        },
      },
    });
  }, []);

  useEffect(() => {
    var elements = document.getElementsByClassName("leaflet-control-geocoder");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }

    var map = mapEl.current.leafletElement;
    var geocoderNominatim = new L.Control.Geocoder.nominatim();
    let MarkLayer;
    let group;

    const iconMarker = new Icon({
      iconUrl: marker,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    var options = {
      collapsed: false,
      placeholder: "Buscar dirección",
      errorMessage: "No se encontró ningún resultado",
      query: `${state.direccion.toLowerCase()}, ${state.provincia.toLowerCase()}`,
      geocoder: geocoderNominatim,
      defaultMarkGeocode: false,
      draggable: true,
    };

    var geocoderControl = L.Control.geocoder(options).on(
      "markgeocode",
      function (e) {
        if (MarkLayer) {
          map.removeLayer(MarkLayer);
        }
        const box = e.geocode.center;
        //const name = e.geocode.name;
        setState({
          ...state,
          latitud: box.lat,
          longitud: box.lng,
        });
        MarkLayer = L.marker([box.lat, box.lng], {
          draggable: true,
          icon: iconMarker,
        })
          .addTo(map)
          .on("dragend", onDragEnd)
          .on("drag", onDrag)
          .bindPopup(e.geocode.name)
          .openPopup();
        displayLatLng(box);

        group = new L.featureGroup([MarkLayer]);

        map.fitBounds(group.getBounds());

        var element = document.getElementsByClassName(
          "leaflet-control-geocoder-alternatives"
        );
        element[0].classList.add(
          "leaflet-control-geocoder-alternatives-minimized"
        );
      }
    );
    geocoderControl.addTo(map);

    function onDragEnd(event) {
      const latlng = event.target.getLatLng();
      geocoderNominatim.reverse(
        latlng,
        map.options.crs.scale(map.getZoom()),
        function (reverseGeocoded) {
          event.target.setPopupContent(reverseGeocoded[0].name).openPopup();
        },
        this
      );
      displayLatLng(latlng);
    }

    function onDrag(event) {
      const latlng = event.target.getLatLng();
      displayLatLng(latlng);
    }

    function displayLatLng(latlng) {
      setState({
        ...state,
        latitud: latlng.lat,
        longitud: latlng.lng,
      });
    }
  }, [state]);

  let polygon_dpto = null;
  if (!loadingDepartamento) {
    const dpto = dataDepartamento.getDepartamento;
    polygon_dpto = (
      <Polygon
        key={dpto._id}
        color="rgba(64,105,135,0.9)"
        weight="3"
        opacity="1"
        fillColor="whitesmoke"
        fillOpacity="0.2"
        positions={dpto.poligono}
      />
    );
  }

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

  let provincias = null;
  if (!loadingProvincias) {
    provincias = dataProvincias.getProvincias.map((ele, id) => {
      return (
        <MenuItem key={ele._id} value={ele.nombre}>
          {`${ele.codigo} - ${ele.nombre}`}
        </MenuItem>
      );
    });
  }

  const handleChangeCheck = (evt) => {
    const { name, checked } = evt.target;
    const array = state.morbilidades.slice();
    if (checked) {
      array.push(name);
      setState({
        ...state,
        morbilidades: array,
      });
    } else {
      const filter = array.filter((ele) => {
        return ele !== name;
      });
      setState({
        ...state,
        morbilidades: filter,
      });
    }
    var elements = document.getElementsByClassName("leaflet-control-geocoder");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  };

  let morbilidades = null;
  if (!loadingMorbilidades) {
    morbilidades = dataMorbilidades.getMorbilidades.map((ele, id) => {
      return (
        <FormControlLabel
          key={ele._id}
          className={classes.formControllabel}
          control={
            <Checkbox
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
    if (name === "nombres") {
      if (onlyLetterAndSpace(value)) {
        return;
      }
    }
    setState({
      ...state,
      [name]: name === "diagnostico" ? value : value.toUpperCase(),
    });
    var elements = document.getElementsByClassName("leaflet-control-geocoder");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  };

  const handleChangeInputEdad = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: parseInt(value, 10),
    });
    var elements = document.getElementsByClassName("leaflet-control-geocoder");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  };

  const handleChangeInputProv = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    var elements = document.getElementsByClassName("leaflet-control-geocoder");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    getDistritos({
      variables: {
        filter: {
          provincia: value,
        },
        sortby: [
          {
            field: "codigo",
            direction: "ASC",
          },
        ],
      },
    });
    getProvincia({
      variables: {
        filter: {
          nombre: value,
        },
      },
    });
  };

  const handleChangeInputDist = (evt) => {
    const { name, value } = evt.target;
    var elements = document.getElementsByClassName("leaflet-control-geocoder");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    setState({
      ...state,
      [name]: value,
    });
    getDistrito({
      variables: {
        provincia: state.provincia,
        filter: {
          nombre: value,
        },
      },
    });
  };

  const handleChangeInputDirec = (evt) => {
    const { name, value } = evt.target;
    var elements = document.getElementsByClassName("leaflet-control-geocoder");
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
    setState({
      ...state,
      [name]: name === "diagnostico" ? value : value.toUpperCase(),
    });
  };

  const handleChangeInputLatLng = (evt) => {
    return;
  };

  const validateMsg = (input) => {};

  const ColorButton1 = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(indigo["600"]),
      backgroundColor: indigo["600"],
      "&:hover": {
        backgroundColor: indigo["700"],
      },
    },
  }))(Button);
  const ColorButton2 = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(indigo["100"]),
      backgroundColor: indigo["100"],
      "&:hover": {
        backgroundColor: indigo["200"],
      },
    },
  }))(Button);

  const onClickGuardar = () => {
    updatePaciente({
      variables: {
        _id: id,
        input: state,
      },
    });
  };

  const onClickRegresar = () => {
    setRegresar(true);
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        <Grid className={classes.grid}>
          <Grid item xs={12}>
            <Paper elevation={3}>
              {regresar ? (
                <Loading />
              ) : (
                <>
                  <div className={classes.containerHeader}>
                    <div className={classes.containerHeaderTit}>
                      <PersonIcon className={classes.icontitle} />
                      <Typography variant="h5" className={classes.title}>
                        EDITAR PACIENTE
                      </Typography>
                    </div>
                    <div className={classes.containerHeaderBtn}>
                      <ColorButton1
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={onClickGuardar}
                      >
                        Guardar
                      </ColorButton1>
                      <ColorButton2
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        startIcon={<ArrowBackIcon />}
                        onClick={onClickRegresar}
                      >
                        Regresar
                      </ColorButton2>
                    </div>
                  </div>
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
                    <Grid item xs={12} md={9}>
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
                              value={state.nombres}
                              className={classes.input}
                              onChange={handleChangeInput}
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
                              onChange={handleChangeInputEdad}
                            />
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
                            <EnhancedEncryptionIcon className={classes.icon} />
                          </Grid>
                          <Grid item className={classes.containerInput}>
                            <FormControl className={classes.containerInput_}>
                              <InputLabel id="ipt-seguro-label">
                                Seguro
                              </InputLabel>
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
                                !validate.celular &&
                                (() => validateMsg("celular"))
                              }
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                      <div className={classes.form}>
                        <Grid
                          container
                          spacing={1}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <ContactsIcon className={classes.icon} />
                          </Grid>
                          <Grid item className={classes.containerInput}>
                            <TextField
                              error={!validate.contacto}
                              id="ipt-contacto"
                              label="Persona de contacto"
                              type="text"
                              name="contacto"
                              value={state.contacto}
                              className={classes.input}
                              onChange={handleChangeInput}
                              helperText={
                                !validate.contacto &&
                                (() => validateMsg("contacto"))
                              }
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.form}>
                        <Grid
                          container
                          spacing={1}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-end"
                        >
                          <Grid item>
                            <LocalHospitalIcon className={classes.icon} />
                          </Grid>
                          <Grid item className={classes.containerInput}>
                            <TextField
                              id="ipt-diagnostico"
                              label="Diagnóstico"
                              multiline
                              rowsMax={4}
                              name="diagnostico"
                              value={state.diagnostico}
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
                                onChange={handleChangeInputProv}
                              >
                                {provincias}
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
                                onChange={handleChangeInputDist}
                              >
                                {distritos}
                              </Select>
                            </FormControl>
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
                              onChange={handleChangeInputDirec}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <div className={classes.containerMap}>
                        <Map
                          className={classes.map}
                          center={position}
                          zoom={zoom}
                          ref={mapEl}
                        >
                          <TileLayer url={url} attribution={attribution} />
                          {polygon_dpto}
                        </Map>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Grid item xs={12}>
                        <div className={classes.form}>
                          <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <PinDropIcon className={classes.icon_} />
                            </Grid>
                            <Grid item className={classes.containerInput}>
                              <TextField
                                id="ipt-latitud"
                                label="Latitud"
                                type="text"
                                name="latitud"
                                value={state.latitud}
                                className={classes.input}
                                onChange={handleChangeInputLatLng}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className={classes.form}>
                          <Grid
                            container
                            spacing={1}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <PinDropIcon className={classes.icon_} />
                            </Grid>
                            <Grid item className={classes.containerInput}>
                              <TextField
                                id="ipt-longitud"
                                label="Longitud"
                                type="text"
                                name="longitud"
                                value={state.longitud}
                                className={classes.input}
                                onChange={handleChangeInputLatLng}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Index;
