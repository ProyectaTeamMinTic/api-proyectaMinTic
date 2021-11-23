//IMPORTS
import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { ProjectModel } from "../project/project.js";
import { UserModel } from "../user/user.js";

//DEFINIR ESQUEMAS
const { Schema, model } = mongoose;

//METODOLOGIA 4 - VIRTUAL POPULATE (DESDE EL LADO 1 DE LA RELACIÓN)
const registrationSchema = new Schema({
  estado: {
    type: String,
    enum: ["ACEPTADA", "RECHAZADA", "PENDIENTE"],
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  fechaEgreso: {
    type: Date,
    required: true,
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
