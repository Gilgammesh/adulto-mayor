// Importamos la librería de mongoose
import { Schema, model } from "mongoose";

// Creamos el Schema
const schema = new Schema(
  {
    departamento: String,
    nombre: String,
    poligono: [[[Number, Number]]]
  },
  {
    collection: "provincias",
    timestamps: true
  }
);

// Exportamos el modelo y pasamos el schema
export default model("provincias", schema);
