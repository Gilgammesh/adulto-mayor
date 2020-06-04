/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import Estados from "../../database/models/estados";
import { buildSortFromArg } from "@entria/graphql-mongo-helpers";

/*****************************************************************************************/
// Creamos los resolvers de este Objeto y exportamos //
/*****************************************************************************************/
export default {
  Query: {
    getEstado: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Estados.findOne({ _id: _id });
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getEstados: async (_, { sortby }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Estados.find().sort(buildSortFromArg(sortby));
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
  Mutation: {
    createEstado: async (_, { input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const newModel = new Estados(input);
        await newModel.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    updateEstado: async (_, { _id, input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Estados.findOneAndUpdate(
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
    deleteEstado: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Estados.findOneAndDelete({ _id: _id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
