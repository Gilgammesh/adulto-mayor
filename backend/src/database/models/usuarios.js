// Importamos la librería de mongoose
import { Schema, model } from "mongoose";

// Creamos el Schema
const schema = new Schema(
  {
    user: String,
    password: String,
  },
  {
    collection: "usuarios",
    timestamps: true,
  }
);

// Exportamos el modelo y pasamos el schema
export default model("usuarios", schema);
