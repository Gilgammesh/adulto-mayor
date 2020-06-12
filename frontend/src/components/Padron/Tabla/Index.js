import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Paper, Button, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EditIcon from "@material-ui/icons/Edit";
import MUIDataTable from "mui-datatables";
import { useStyles } from "./styles";
import { useQuery } from "react-apollo";
import "./styles.css";
import { GET_PACIENTES } from "./Querys";
import Loading from "../../Loading/Index";

const Index = () => {
  const history = useHistory();
  const classes = useStyles();

  const { loading, data } = useQuery(GET_PACIENTES, {
    variables: {
      sortby: [
        {
          field: "createdAt",
          direction: "DESC",
        },
        {
          field: "provincia",
          direction: "ASC",
        },
        {
          field: "distrito",
          direction: "ASC",
        },
        {
          field: "nombres",
          direction: "ASC",
        },
      ],
    },
  });

  if (loading) {
    return (
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Loading />
        </Paper>
      </Grid>
    );
  }

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(teal["100"]),
      backgroundColor: teal["100"],
      "&:hover": {
        backgroundColor: teal["200"],
      },
    },
  }))(Button);

  const columns = [
    {
      label: "DNI",
      name: "dni",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Apellidos y Nombres",
      name: "nombres",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Edad",
      name: "edad",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Dirección",
      name: "direccion",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Provincia",
      name: "provincia",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Distrito",
      name: "distrito",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Seguro de Salud",
      name: "seguro",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Celular",
      name: "celular",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Morbilidades",
      name: "morbilidades",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Estado",
      name: "estado",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Acciones",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              aria-label="delete"
              onClick={() =>
                history.push(`/editar_paciente/${tableMeta.rowData[0]}`)
              }
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    responsive: "stacked",
    selectableRows: "none",
    downloadOptions: {
      filename: "padro_adultos_mayores_con_riesgo.csv",
      separator: ",",
    },
    textLabels: {
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver/Ocultar columnas",
        filterTable: "Filtrar tabla",
      },
      pagination: {
        next: "Siguiente Página",
        previous: "Anterior Página",
        rowsPerPage: "Filas por Página:",
        displayRows: "de",
      },
      filter: {
        title: "FILTROS",
        reset: "reiniciar",
      },
    },
  };

  const onClickNew = () => {
    history.push("/nuevo_paciente");
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <div id="divTablePadron" className={classes.container}>
          <ColorButton
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            startIcon={<PersonAddIcon />}
            onClick={onClickNew}
          >
            Nuevo Paciente
          </ColorButton>
          <MUIDataTable
            title="Padrón de Adultos Mayores en la Región San Martín"
            data={data.getPacientes}
            columns={columns}
            options={options}
          />
        </div>
      </Paper>
    </Grid>
  );
};

export default Index;
