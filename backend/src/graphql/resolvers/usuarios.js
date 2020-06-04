/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import Usuarios from "../../database/models/usuarios";
import { encrypt, validateEncrypt } from "../../helpers/encrypt";
import { generateToken, validateToken } from "../../helpers/token";
import { buildSortFromArg } from "@entria/graphql-mongo-helpers";

/*****************************************************************************************/
// Creamos los resolvers de este Objeto y exportamos //
/*****************************************************************************************/
export default {
  Query: {
    getUsuario: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Usuarios.findOne({ _id: _id });
        return result;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    getUsuarios: async (_, { sortby }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Usuarios.find().sort(buildSortFromArg(sortby));
        return result;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
  Mutation: {
    createUsuario: async (_, { input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        input.password = await encrypt(input.password);
        const newModel = new Usuarios(input);
        await newModel.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateUsuario: async (_, { _id, input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        input.password = await encrypt(input.password);
        await Usuarios.findOneAndUpdate(
          { _id: _id },
          { $set: input },
          { new: true }
        );
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    deleteUsuario: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Usuarios.findOneAndDelete({ _id: _id });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    loginUsuario: async (_, { input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        let response;
        const usuario = await Usuarios.findOne({
          user: input.user,
        });
        if (!usuario) {
          response = {
            estado: false,
            msg: "El usuario ingresado no es válido!!",
          };
          return response;
        }
        const isValid = await validateEncrypt(input.password, usuario.password);
        if (!isValid) {
          response = {
            estado: false,
            msg: "La contraseña ingresada no es válida!!",
          };
          return response;
        }
        // Generamos el token del cliente
        const token = await generateToken({
          _id: usuario._id,
          fechaLogin: new Date(),
        });

        response = {
          estado: true,
          token: token,
          usuario: usuario,
        };
        return response;
      } catch (error) {
        console.error(error);
        const response = {
          estado: false,
          msg: error,
        };
        return response;
      }
    },
    validateUsuario: async (_, { token }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const tokendecode = await validateToken(token);

        if (tokendecode) {
          const result = await Usuarios.findOne({ _id: tokendecode._id });
          return result;
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
