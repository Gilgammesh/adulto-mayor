/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import bcrypt from "bcryptjs";

/*****************************************************************************************/
// Función para encriptar cualquier string o cadena de texto //
/*****************************************************************************************/
export const encrypt = async (string) => {
  try {
    // Cuantas veces vamos a aplicar el algoritmo de hash (10 veces)
    const salt = await bcrypt.genSalt(10);
    // Convertimos el string a un código encriptado
    const crypt = bcrypt.hash(string, salt);
    return crypt; // Retornamos el valor del string encriptado
  } catch (error) {
    console.log(error);
    return null; // En caso de error retornamos nulo
  }
};

/*****************************************************************************************/
// Función para validar o comparar un texto con un string encriptado //
/*****************************************************************************************/
export const validateEncrypt = async (string, encryptString) => {
  try {
    // Comparamos el string con el string ecriptado
    const isValid = await bcrypt.compare(string, encryptString);
    return isValid; // Retornamos si es valido (true o false)
  } catch (error) {
    console.log(error);
    return false; // En caso de error retornamos falso
  }
};
