import React from "react";
import { Grid, Paper } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useStyles } from "./styles";
import { useQuery } from "react-apollo";
import "./styles.css";
import { GET_PACIENTES } from "./Querys";
import Loading from "../../Loading/Index";

const Index = () => {
  const classes = useStyles();

  const { loading, data } = useQuery(GET_PACIENTES, {
    variables: {
      sortby: [
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
    return <Loading />;
  }

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

  return (
    <Grid item xs={12}>
      <Paper elevation={3}>
        <div className={classes.container}>
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
