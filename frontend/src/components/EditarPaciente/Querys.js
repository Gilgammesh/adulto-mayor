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
// Query para consultar datos de un Paciente //
/*******************************************************************************************************/
export const GET_PACIENTE = gql`
  query($filter: PacienteFilter) {
    getPaciente(filter: $filter) {
      _id
      dni
      nombres
      edad
      direccion
      provincia
      distrito
      seguro
      celular
      morbilidades
      latitud
      longitud
      estado
      celulares
      contacto
      diagnostico
    }
  }
`;

/*******************************************************************************************************/
// Mutacion para actualizar los datos de un paciente //
/*******************************************************************************************************/
export const UPDATE_PACIENTE = gql`
  mutation($id: ID, $input: PacienteInput) {
    updatePaciente(_id: $id, input: $input) 
  }
`;
