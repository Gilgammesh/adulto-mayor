// Importamos librerias de Apollo Graphql
import { gql } from "apollo-boost";

/*******************************************************************************************************/
// Definimos la mutation para el Ingreso o Login del Usuario a la Plataforma //
/*******************************************************************************************************/
export const LOGIN_USUARIO = gql`
  mutation($form: UsuarioInput) {
    loginUsuario(input: $form) {
      estado
      msg
      token
      usuario {
        _id
        user
      }
    }
  }
`;
