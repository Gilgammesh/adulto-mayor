/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import Distritos from "../../database/models/distritos";
import { buildSortFromArg } from "@entria/graphql-mongo-helpers";

/*****************************************************************************************/
// Creamos los resolvers de este Objeto y exportamos //
/*****************************************************************************************/
export default {
  Query: {
    getDistrito: async (_, { filter }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Distritos.findOne(filter);
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getDistritos: async (_, { filter, sortby }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Distritos.find(filter).sort(
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
    createDistrito: async (_, { input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const newModel = new Distritos(input);
        await newModel.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateDistrito: async (_, { _id, input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Distritos.findOneAndUpdate(
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
    deleteDistrito: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Distritos.findOneAndDelete({ _id: _id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
