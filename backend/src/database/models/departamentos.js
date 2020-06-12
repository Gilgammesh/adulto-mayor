// Importamos la librería de mongoose
import { Schema, model } from "mongoose";

// Creamos el Schema
const schema = new Schema(
  {
    nombre: String,
    codigo: String,
    latitud: Number,
    longitud: Number,
    poligono: [[[Number, Number]]],
  },
  {
    collection: "departamentos",
    timestamps: true,
  }
);

// Exportamos el modelo y pasamos el schema
export default model("departamentos", schema);
