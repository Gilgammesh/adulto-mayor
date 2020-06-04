/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import Morbilidades from "../../database/models/morbilidades";
import { buildSortFromArg } from "@entria/graphql-mongo-helpers";

/*****************************************************************************************/
// Creamos los resolvers de este Objeto y exportamos //
/*****************************************************************************************/
export default {
  Query: {
    getMorbilidad: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Morbilidades.findOne({ _id: _id });
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getMorbilidades: async (_, { sortby }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Morbilidades.find().sort(buildSortFromArg(sortby));
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
  Mutation: {
    createMorbilidad: async (_, { input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const newModel = new Morbilidades(input);
        await newModel.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateMorbilidad: async (_, { _id, input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Morbilidades.findOneAndUpdate(
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
    deleteMorbilidad: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Morbilidades.findOneAndDelete({ _id: _id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
