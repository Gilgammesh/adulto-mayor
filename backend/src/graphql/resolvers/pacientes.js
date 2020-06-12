/*****************************************************************************************/
// Añadimos los Imports //
/*****************************************************************************************/
import Pacientes from "../../database/models/pacientes";
import { buildSortFromArg } from "@entria/graphql-mongo-helpers";

/*****************************************************************************************/
// Creamos los resolvers de este Objeto y exportamos //
/*****************************************************************************************/
export default {
  Query: {
    getPaciente: async (_, { filter }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Pacientes.findOne(filter);
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getPacientes: async (_, { sortby }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const result = await Pacientes.find().sort(buildSortFromArg(sortby));
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
  Mutation: {
    createPaciente: async (_, { input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        const paciente = await Pacientes.findOne({ dni: input.dni });
        if (paciente) {
          return {
            estado: false,
            msg: "Ya existe un paciente con éste número de DNI",
          };
        }
        const newModel = new Pacientes(input);
        await newModel.save();
        return {
          estado: true,
          msg: "Se creó correctamente el paciente",
        };
      } catch (error) {
        console.error(error);
        return {
          estado: false,
          msg: error,
        };
      }
    },
    updatePaciente: async (_, { _id, input }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Pacientes.findOneAndUpdate(
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
    deletePaciente: async (_, { _id }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Pacientes.findOneAndDelete({ _id: _id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    createObservacion: async (_, { descripcion }, { decode }) => {
      if (!decode) {
        throw new Error("Se necesita autorización");
      }
      try {
        await Pacientes.findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              observaciones: [descripcion],
            },
          },
          { new: true }
        );
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
