//IMPORTS
import mongoose from "mongoose";
import { ProjectModel } from "../project/project.js";
import { UserModel } from "../user/user.js";

//DEFINICION VARIABLES

const { Schema, model } = mongoose; //Deconstrucción. De la librería mongoose solo utilizaremos el esquema y el modelo

//DEFINIR ESQUEMAS
const progressSchema = new Schema({
  //const avanceSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  // observaciones: [
  //   {
  //     type: String,
  //   },
  // ],
  observaciones: [
    {
      descripcion: { type: String, required: true },
    },
  ],
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

//DEFINIR MODELO DEL OBJETO
const ProgressModel = model("Progres", progressSchema); //const ModeloAvance = model('Avance', avanceSchema);

//EXPORTACIÓN DEL MODELO
export { ProgressModel }; //export { ModeloAvance };
