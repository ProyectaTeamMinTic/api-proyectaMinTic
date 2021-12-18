//IMPORTS
import mongoose from "mongoose";
import { UserModel } from "../user/user.js";

//DEFINIR ESQUEMAS
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    presupuesto: {
      type: Number,
      required: true,
    },
    fechaInicio: {
      type: String,
      // required: true,
      default: ''
    },
    fechaFin: {
      type: String,
      // required: true,
      default: ''
    },
    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO"],
      default: "INACTIVO",
    },
    fase: {
      type: String,
      enum: ["INICIADO", "DESARROLLO", "TERMINADO", "NULL"],
      default: "NULL",
    },
    lider: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    objetivoGeneral: {
      type: String,
      required: true,
    },
    objetivoEspecifico1: {
      type: String,
      required: true,
    },
    objetivoEspecifico2: {
      type: String,
      required: true,
    },
    objetivoEspecifico3: {
      type: String,
      required: true,
    }
    // objetivos: [
    //   {
    //     descripcion: {
    //       type: String,
    //       required: true,
    //     },
    //     tipo: {
    //       type: String,
    //       enum: ["GENERAL", "ESPECIFICO"],
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//METODOLOGIA 4 - VIRTUAL POPULATE (DESDE EL LADO 1 DE LA RELACIÓN)
//PROYECTO-AVANCES DE ESTUDIANTES(VIRTUAL POPULATE para listar los avances que tiene un proyecto)
// projectSchema.virtual("avances", {
//   ref: "Progress",
//   localField: "_id",
//   foreignField: "proyecto",
// });
//PROYECTO-INSCRIPCIONES DE ESTUDIANTES (VIRTUAL POPULATE para listar que inscripciones tiene un proyecto)
//PREGUNTA(POPULATE ANIDADO para ver los estudientes que hicieron las inscripciones)
// projectSchema.virtual("inscripciones", {
//   ref: "Registration",
//   localField: "_id",
//   foreignField: "proyecto",
// });
// projectSchema.virtual("lider", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "proyectos",
// });


//DEFINIR MODELO DEL OBJETO
const ProjectModel = model("Project", projectSchema);


//EXPORTACIÓN DEL MODELO
export { ProjectModel };