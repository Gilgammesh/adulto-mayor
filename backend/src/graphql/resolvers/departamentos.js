/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import Departamentos from "../../database/models/departamentos";
import { buildSortFromArg } from "@entria/graphql-mongo-helpers";

/*****************************************************************************************/
// Creamos los resolvers de este Objeto y exportamos //
/*****************************************************************************************/
export default {
  Query: {
    getDepartamento: async (_, { filter }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Departamentos.findOne(filter);
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getDepartamentos: async (_, { sortby }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Departamentos.find().sort(
          buildSortFromArg(sortby)
        );
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
  Mutation: {
    createDepartamento: async (_, { input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const newModel = new Departamentos(input);
        await newModel.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateDepartamento: async (_, { _id, input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Departamentos.findOneAndUpdate(
          { _id: _id },
          { $set: input },
          { new: true }
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    deleteDepartamento: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Departamentos.findOneAndDelete({ _id: _id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
