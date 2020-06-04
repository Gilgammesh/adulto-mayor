//*** Variables generales ***//
const TOKEN_KEY = "REACT_APP_TOKEN_LOGIN_ADULTOMAYOR";

/*****************************************************************************************/
// Función para guardar token de autorización en LocalStorage del Navegador //
/*****************************************************************************************/
export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/*****************************************************************************************/
// Función para obtener el token de autorización en LocalStorage del Navegador //
/*****************************************************************************************/
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*****************************************************************************************/
// Función para eliminar el token de autorización en LocalStorage del Navegador //
/*****************************************************************************************/
export const deleteToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
