// Importamos la librería de mongoose
import { Schema, model } from "mongoose";

// Creamos el Schema
const schema = new Schema(
  {
    departamento: String,
    provincia: String,
    nombre: String,
    poligono: [[[Number, Number]]]
  },
  {
    collection: "distritos",
    timestamps: true
  }
);

// Exportamos el modelo y pasamos el schema
export default model("distritos", schema);
