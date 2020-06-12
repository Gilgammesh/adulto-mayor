import { gql } from "apollo-boost";

/*******************************************************************************************************/
// Query para obtener la lista de Pacientes //
/*******************************************************************************************************/
export const GET_PACIENTES = gql`
  query($sortby: [SortBy]) {
    getPacientes(sortby: $sortby) {
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
      estado
    }
  }
`;
