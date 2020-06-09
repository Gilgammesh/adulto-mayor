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
// Query para obtener la lista de Provincias //
/*******************************************************************************************************/
export const GET_PROVINCIAS = gql`
  query($sortby: [SortBy]) {
    getProvincias(sortby: $sortby) {
      _id
      nombre: String
      codigo: String
      latitud: Float
      longitud: Float
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
      provincia: String
      nombre: String
      codigo: String
      latitud: Float
      longitud: Float
    }
  }
`;
