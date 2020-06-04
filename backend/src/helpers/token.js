/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import jwt from "jsonwebtoken";

/*****************************************************************************************/
// Función que gener un token //
/*****************************************************************************************/
export const generateToken = async (object) => {
  try {
    const secret = process.env.APP_ADULTOMAYOR_SECRET_TEXT;
    const token = jwt.sign(object, secret);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*****************************************************************************************/
// Función para validar y decodificar un token //
/*****************************************************************************************/
export const validateToken = async (token) => {
  try {
    if (token) {
      const secret = process.env.APP_ADULTOMAYOR_SECRET_TEXT;
      const decode = jwt.verify(token, secret);
      return decode;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
