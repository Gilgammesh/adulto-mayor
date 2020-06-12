// Importamos la librería de mongoose
import { Schema, model } from "mongoose";

// Creamos el Schema
const Observaciones = new Schema(
  {
    descripcion: String,
  },
  {
    timestamps: true,
  }
);

const schema = new Schema(
  {
    dni: String,
    nombres: String,
    edad: Number,
    direccion: String,
    provincia: String,
    distrito: String,
    seguro: String,
    celular: String,
    morbilidades: [String],
    latitud: Number,
    longitud: Number,
    estado: String,
    celulares: [String],
    contacto: String,
    diagnostico: String,
    observaciones: [Observaciones],
  },
  {
    collection: "pacientes",
    timestamps: true,
  }
);

// Exportamos el modelo y pasamos el schema
export default model("pacientes", schema);
