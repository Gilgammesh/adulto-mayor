// Importamos libreria de Excel to Json
import { join } from "path";
import { readdir } from "fs";
import excelToJson from "convert-excel-to-json";
import Pacientes from "../database/models/pacientes";

// Definimos la función que convierte un Excel a formato Json
export const convertExcelJson = async (pathSource, file) => {
  const result = excelToJson({
    sourceFile: join(pathSource, file),
    header: {
      rows: 1,
    },
    sheets: ["data"],
    columnToKey: {
      A: "dni",
      B: "nombres",
      C: "edad",
      D: "direccion",
      E: "provincia",
      F: "distrito",
      G: "seguro",
      H: "celular",
    },
  });
  await Pacientes.insertMany(result.data, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log(`Se insertó correctamente la tabla ${file}`);
    }
  });
};

// Insertamos la Data de los excels a la base de datos
const processData = async () => {
  await Pacientes.deleteMany();
  const directoryPath = join(__dirname, "../../", "data");
  readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Imposible escanear el directorio: " + err);
    }
    files.forEach(async function (file) {
      if (file !== ".DS_Store") {
        await convertExcelJson(directoryPath, file);
      }
    });
  });
};

export default processData;
