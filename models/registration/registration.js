//IMPORTS
import mongoose from "mongoose";
import { ProjectModel } from "../project/project.js";
import { UserModel } from "../user/user.js";

//DEFINIR VARIABLES
const { Schema, model } = mongoose;

//DEFINIR ESQUEMAS
const registrationSchema = new Schema({
  estado: {
    type: String,
    enum: ["ACEPTADA", "RECHAZADA", "PENDIENTE"],
    default: "PENDIENTE",
  },
  fechaIngreso: {
    type: String,
    required: false,
  },
  fechaEgreso: {
    type: String,
    required: false,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: true,
  },
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

//DEFINIR MODELO DEL OBJETO
const registrationModel = model("Registration", registrationSchema);

//EXPORTACIÓN DEL MODELO
export { registrationModel };
