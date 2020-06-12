// Importamos librerias de Apollo Graphql
import { gql } from "apollo-boost";

/*******************************************************************************************************/
// Query para obtener la lista de Seguros //
/*******************************************************************************************************/
export const GET_SEGUROS = gql`
  query($sortby: [SortBy]) {
    getSeguros(sortby: $sortby) {
      _id
      nombre
    }
  }
`;

/*******************************************************************************************************/
// Query para obtener la lista de Morbilidades //
/*******************************************************************************************************/
export const GET_MORBILIDADES = gql`
  query($sortby: [SortBy]) {
    getMorbilidades(sortby: $sortby) {
      _id
      nombre
    }
  }
`;

/*******************************************************************************************************/
// Query para obtener los datos del Departamento //
/*******************************************************************************************************/
export const GET_DEPARTAMENTO = gql`
  query($filter: DepartamentoFilter) {
    getDepartamento(filter: $filter) {
      _id
      nombre
      codigo
      latitud
      longitud
      poligono
    }
  }
`;

/*******************************************************************************************************/
// Query para obtener la lista de Provincias //
/*******************************************************************************************************/
export const GET_PROVINCIAS = gql`
  query($sortby: [SortBy]) {
    getProvincias(sortby: $sortby) {
      _id
      nombre
      codigo
    }
  }
`;

/*******************************************************************************************************/
// Query para obtener los datos de una Provincia //
/*******************************************************************************************************/
export const GET_PROVINCIA = gql`
  query($filter: ProvinciaFilter) {
    getProvincia(filter: $filter) {
      _id
      nombre
      codigo
      latitud
      longitud
    }
  }
`;

/*******************************************************************************************************/
// Query para obtener la lista de Distritos //
/*******************************************************************************************************/
export const GET_DISTRITOS = gql`
  query($filter: DistritoFilter, $sortby: [SortBy]) {
    getDistritos(filter: $filter, sortby: $sortby) {
      _id
      provincia
      nombre
      codigo
    }
  }
`;

/*******************************************************************************************************/
// Query para obtener los datos de un Distrito //
/*******************************************************************************************************/
export const GET_DISTRITO = gql`
  query($filter: DistritoFilter) {
    getDistrito(filter: $filter) {
      _id
      provincia
      nombre
      codigo
      latitud
      longitud
    }
  }
`;

/*******************************************************************************************************/
// Mutacion para crear un nuevo Paciente //
/*******************************************************************************************************/
export const CREATE_PACIENTE = gql`
  mutation($input: PacienteInput) {
    createPaciente(input: $input) {
      estado
      msg
    } 
  }
`;