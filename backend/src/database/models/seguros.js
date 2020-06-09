// Importamos la librería de mongoose
import { Schema, model } from "mongoose";

// Creamos el Schema
const schema = new Schema(
  {
    nombre: String,
  },
  {
    collection: "seguros",
    timestamps: true,
  }
);

// Exportamos el modelo y pasamos el schema
export default model("seguros", schema);
