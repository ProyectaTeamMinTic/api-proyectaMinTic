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
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ["ACTIVO", "INACTIVO"],
      default: "INACTIVO",
    },
    fase: {
      type: String,
      enum: ["INICIADO", "DESARROLLO", "TERMINADO", "NULA"],
      default: "NULA",
    },
    lider: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    objetivos: [
      {
        descripcion: {
          type: String,
          required: true,
        },
        tipo: {
          type: String,
          enum: ["GENERAL", "ESPECIFICO"],
          required: true,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//METODOLOGIA 4 - VIRTUAL POPULATE (DESDE EL LADO 1 DE LA RELACIÓN)
projectSchema.virtual("avances", {
    ref: "Progress",
    localField: "_id",
    foreignField: "proyecto",
  });
  
  projectSchema.virtual("inscripciones", {
    ref: "Registration",
    localField: "_id",
    foreignField: "proyecto",
  });

  
//DEFINIR MODELO DEL OBJETO
const ProjectModel = model("Project", projectSchema);


//EXPORTACIÓN DEL MODELO
export { ProjectModel };